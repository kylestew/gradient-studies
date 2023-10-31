import * as THREE from "three";

import watchState from "./lib/state-spy";
import { loadModel } from "./lib/loaders";
import loadMaterial from "./mat";

import modelUrl from "../assets/models/icosahedron.glb?url";

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
        let mat = await loadMaterial();
        state.mesh = new THREE.Mesh(geo, mat);
    }, 0);

    return state;
}
