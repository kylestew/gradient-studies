import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const texLoader = new TextureLoader();

function loadModel(file) {
    return new Promise((resolve, reject) => {
        loader.load(file, (scene) => {
            resolve(scene);
        });
    });
}

function loadTexture(file) {
    return new Promise((resolve, reject) => {
        texLoader.load(file, (res) => {
            resolve(res);
        });
    });
}

export { loadModel, loadTexture };
