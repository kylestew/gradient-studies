import * as dat from "dat.gui";

function createGUI(state) {
    const gui = new dat.GUI();

    var optionsFolder = gui.addFolder("Options");
    optionsFolder.open();

    optionsFolder
        .addColor(state, "backgroundColor") //
        .name("Background");
}

export default createGUI;
