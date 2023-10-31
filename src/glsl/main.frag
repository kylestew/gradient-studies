precision highp float;

#include noise_common;
#include noise3d;

in vec3 vNormal;
in vec3 vOPosition;
in vec3 vPosition;
in vec2 vUv;
in vec3 vN;

uniform sampler2D matCapMap;
uniform float distort;
uniform float roughness;
uniform float rimBoost;

vec4 firstColor = vec4(1., 0., 0., 1.);
vec4 middleColor = vec4(0., 1., 0., 1.);
vec4 endColor = vec4(0., 0., 1., 1.);

vec4 gradient(in float v) {
    v = mod(v, 1.);
    float h = .5;
    vec4 col = h > v ? mix(firstColor, middleColor, v / h)
                     : mix(middleColor, endColor, (v - h) / (1. - h));
    return col;
}

float random(vec2 n) { return .5 - fract(sin(dot(n.xy, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 randVector(in vec3 p) { return normalize(vec3(random(p.xy), random(p.yz), random(p.xz))); }

out vec4 color;
void main(void) {
    vec3 normal =
        normalize(vNormal + 0.1 * noise3d(vNormal.xyz) + roughness * randVector(vOPosition.xyz));
    vec3 viewDirection = normalize(-vPosition.xyz);

    // float rim = dot(normalize(normal + distort * noise3d(normal)), viewDirection);
    float rim = dot(normal, viewDirection);
    // rim = clamp(1. - pow(abs(rim), 1.), 0., 1.);

    // color = gradient(1. - rim);
    // color = vec4(0.333, 0.222, 0, 0.3);
    color = vec4(vec3(rim), 1.);

    float boost = 1.;
    float opacity = 0.1;
    // color.rgb = mix(color.rgb, color.rgb * pow(rim, boost), opacity);

    // color.a = length(color.rgb);

    /*
        //...

        vec3 eye = normalize(vPosition.xyz);
        vec3 n = normalize(normal);
        vec3 r = reflect(eye, n);

        // sample the matcap spherically?
        // TODO: is this some sort of mapping function for matcaps?
        float m = 2. * sqrt(pow(r.x, 2.) + pow(r.y, 2.) + pow(r.z + 1., 2.));
        vec2 muv = r.xy / m + .5;
        vec4 mat = texture(matCapMap, muv);

        // color = mat;
        // color = vec4(normal, 1);
        */
}