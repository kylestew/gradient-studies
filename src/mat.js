import { MeshBasicMaterial } from "three";
import { loadTexture } from "./lib/loaders";

import matCapUrl from "../assets/matcap_1k.jpg?url";

import fragment from "./glsl/main.frag";

export default async function loadMaterial() {
    let tex = await loadTexture(matCapUrl);
    console.log(tex);

    console.log(fragment);

    const material = new MeshBasicMaterial({
        color: 0x00ff00,
        // wireframe: true,
    });

    return material;
}
