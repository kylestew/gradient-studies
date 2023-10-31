import Sketch from "./src/sketch";
import createState from "./src/state";
import createGUI from "./src/gui";

import Stats from "stats.js";

let state, sketch;
let stats, prevTime;

async function init() {
    // create initial state
    state = await createState(stateDidUpdate);

    // pass to new sketch
    sketch = new Sketch(state);

    // make on scroon controls
    createGUI(state);

    // stay fullscreen
    window.onresize = onWindowResize;
    onWindowResize(true); // set initial size

    // fun extras
    capture = new CCapture({ format: "png" });
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // start RAF
    animate();
}
init();

function animate(time) {
    if (isNaN(time)) time = 0;
    if (prevTime === undefined) prevTime = time;
    const deltaTime = Math.max(time - prevTime, 0);
    prevTime = time;

    if (stats) stats.begin();

    sketch.render(time / 1000.0, deltaTime / 1000.0, state);

    if (isCapturing) {
        let canvas = document.getElementById("render-canvas");
        capture.capture(canvas);
    } else if (saveNextFrame) {
        saveFrame();
        saveNextFrame = false;
    }

    if (stats) stats.end();

    requestAnimationFrame(animate);
}

function stateDidUpdate() {
    sketch.updateState(state);
}

let resizeTimer;
function onWindowResize(force = false) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(
        () => {
            // stay fullscreen
            sketch.resize({
                width: window.innerWidth,
                height: window.innerHeight,
                dpr: window.devicePixelRatio,
            });
        },
        force ? 0 : 100
    );
}

let capture = false;
let isCapturing = false;
let saveNextFrame = false;

window.onkeydown = function (evt) {
    if (evt.key == "s") {
        saveNextFrame = true;
    } else if (evt.key == "r" && !evt.metaKey) {
        if (!isCapturing) {
            isCapturing = true;
            capture.start();
            console.log("recording...");
        } else {
            isCapturing = false;
            capture.stop();
            capture.save();
            console.log("recording ended");
        }
    }
};

function download(dataURL, name) {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = name;
    link.click();
}

function saveFrame() {
    let canvas = document.getElementById("render-canvas");
    var dataURL = canvas.toDataURL("image/png");
    download(dataURL, "image");
}
