precision highp float;

in vec3 position;
in vec3 normal;
in vec4 tangent;
in vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

out vec3 vNormal;
out vec3 vPosition;
out vec3 vOPosition;
out vec2 vUv;
out vec3 vN;

void main() {
    vUv = uv;
    vOPosition = position;
    vec4 mvP = modelViewMatrix * vec4(position, 1.);
    vPosition = mvP.xyz / mvP.w;
    vNormal = normalMatrix * normal;
    vN = (modelMatrix * vec4(position, 1.)).xyz;
    gl_Position = projectionMatrix * mvP;
}