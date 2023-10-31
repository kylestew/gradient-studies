import { RawShaderMaterial, DoubleSide, GLSL3 } from "three";
import { loadTexture } from "./lib/loaders";

import matCapUrl from "../assets/mats/matcap_1k.jpg?url";
// import matCapUrl from "../assets/mats/matcap.png?url";

import vertexShader from "./glsl/main.vert";
import fragmentShader from "./glsl/main.frag";

export default async function loadMaterial() {
    let matcapTexture = await loadTexture(matCapUrl);
    return new RawShaderMaterial({
        uniforms: {
            matCapMap: { value: matcapTexture },
            time: { value: 0 },
            distort: { value: 0.1 },
            roughness: { value: 0 },
            rimBoost: { value: 10 },
        },
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
        side: DoubleSide,
        transparent: true,
        depthWrite: false,
    });
}
