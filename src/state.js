import * as THREE from "three";

import watchState from "./lib/state-spy";
import { loadModel } from "./lib/loaders";
import loadMaterial from "./mat";

import modelUrl from "../assets/models/icosahedron.glb?url";
// import modelUrl from "../assets/models/dodecahedron.glb?url";
// import modelUrl from "../assets/models/box.glb?url";
// import modelUrl from "../assets/models/suzanne.glb?url";

async function loadGeometry() {
    const scene = await loadModel(modelUrl);
    const geo = scene.scene.children[0].children[0].geometry;
    geo.center();
    // const scale = 1;
    const scale = 1.333;
    geo.applyMatrix4(new THREE.Matrix4().makeScale(scale, scale, scale));
    return geo;
}

async function loadSuzanne() {
    const scene = await loadModel(modelUrl);
    const geo = scene.scenes[0].children[0].geometry;
    const mat = new THREE.Matrix4().makeRotationX(-Math.PI / 3);
    geo.applyMatrix4(mat);
    const scale = 1.4;
    geo.applyMatrix4(new THREE.Matrix4().makeScale(scale, scale, scale));
    return geo;
}

export default async function createState(updateFn) {
    // this is a good place for async loaders
    let state = watchState(
        {
            mesh: null,

            backgroundColor: "#000",

            roughness: 0.0,
            rimBoost: 10,
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
