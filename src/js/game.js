import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {OverworldLevel} from "./overworldLevel.js";
import { Level3 } from './level3.js';

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            antialiasing: false
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        super.onInitialize(engine);

    }

    startGame() {
        console.log("start de game!")
        // go to specific scene
        this.goToOverWorld();
    }

    goToOverWorld(){
        // Create and add the new scene
        const overWorldScene = new OverworldLevel();
        this.add('overworld', overWorldScene);

        // Go to the new scene
        this.goToScene('overworld');
    }
    goToLevel3() {
        // Create and add the new scene
        const level3 = new Level3();
        this.add('level3', level3);

        // Go to the new scene
        this.goToScene('level3');
    }

}

new Game()
