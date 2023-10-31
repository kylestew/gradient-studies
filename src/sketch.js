import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Sketch {
    constructor(initialState) {
        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance",
        });

        // renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // renderer.outputEncoding = THREE.sRGBEncoding;

        renderer.domElement.id = "render-canvas";
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;

        let scene = new THREE.Scene();
        this.scene = scene;

        let camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 1);
        camera.lookAt(scene.position);
        this.camera = camera;

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0.5;
        controls.maxDistance = 20;
        controls.enabled = true;
        this.controls = controls;

        this.updateState(initialState);
    }

    resize({ width, height, dpr }) {
        this.size = [width, height];
        this.renderer.setPixelRatio = dpr;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    updateState({ backgroundColor, mesh }) {
        // if state now constains a Mesh, add it
        if (this.mesh == null && mesh != null) {
            const a = 0.3;
            mesh.rotation.set(-a, 0, a);

            this.scene.add(mesh);
            this.mesh = mesh;
        }

        this.scene.background = new THREE.Color(backgroundColor);
    }

    _update(time, deltaTime, {}) {
        if (this.mesh) {
            this.mesh.rotation.y = time / 4000;
            // this.mesh.material.uniforms.time.value = time / 2000;
        }
        this.controls.update();
    }

    render(time, deltaTime, state) {
        this._update(time, deltaTime, state);
        this.renderer.render(this.scene, this.camera);
    }
}

export default Sketch;
