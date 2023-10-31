import * as THREE from "three";

import watchState from "./lib/state-spy";
import { loadModel, loadTexture } from "./lib/loaders";

import modelUrl from "../assets/models/icosahedron.glb?url";
import matCapUrl from "../assets/matcap_1k.jpg?url";

async function loadGeometry() {
    const scene = await loadModel(modelUrl);
    const geo = scene.scene.children[0].children[0].geometry;
    geo.center();
    const scale = 1;
    geo.applyMatrix4(new THREE.Matrix4().makeScale(scale, scale, scale));
    return geo;
}

export default async function createState(updateFn) {
    // this is a good place for async loaders
    let state = watchState(
        {
            backgroundColor: "#ff00ff",
            mesh: null,
        },
        updateFn
    );

    setTimeout(async () => {
        let geo = await loadGeometry();
        let tex = await loadTexture(matCapUrl);

        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            // wireframe: true,
        });

        state.mesh = new THREE.Mesh(geo, material);
    }, 0);

    return state;
}
