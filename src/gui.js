import * as dat from "dat.gui";

function createGUI(state) {
    const gui = new dat.GUI();

    var optionsFolder = gui.addFolder("Options");
    optionsFolder.open();

    optionsFolder
        .addColor(state, "backgroundColor") //
        .name("Background");

    optionsFolder
        .add(state, "roughness", 0.0, 1.0, 0.01) //
        .name("Roughness");

    optionsFolder
        .add(state, "rimBoost", 0.0, 12.0, 0.1) //
        .name("Rim Boost");
}

export default createGUI;
