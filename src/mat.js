import { MeshBasicMaterial } from "three";
import { loadTexture } from "./lib/loaders";

import matCapUrl from "../assets/matcap_1k.jpg?url";

export default async function loadMaterial() {
    let tex = await loadTexture(matCapUrl);
    console.log(tex);

    const material = new MeshBasicMaterial({
        color: 0x00ff00,
        // wireframe: true,
    });

    return material;
}
