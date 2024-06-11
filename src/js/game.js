import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {OverworldLevel} from "./overworldLevel.js";

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
        engine.input.gamepads.setMinimumGamepadConfiguration({
            axis: 4,
            buttons: 6,
        });
        engine.input.gamepads.enabled = true;

        engine.input.gamepads.on('connect', (connectEvent) => {
            console.log('controllers connected')
            this.goToOverWorld();
            this.gamepadConnected = true;
        });

        setTimeout(() => {
            if (!this.gamepadConnected) {
                console.log('no controllers connected!')
                this.goToOverWorld()
            }
        }, 2000);
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

}

new Game()
