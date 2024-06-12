import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { OverworldLevel } from "./overworldLevel.js";
import { Level3 } from './level3.js';
import { Level4 } from './level4.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';

export class Game extends Engine {

    constructor() {
        super({
            width: 1440,
            height: 900,
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
                // this.goToOverWorld()
            }
        }, 2000);
    }

    startGame() {
        console.log("start de game!")
        // go to specific scene
        this.goToLevel2();
    }

    goToOverWorld() {
        // Create and add the new scene
        const overWorldScene = new OverworldLevel();
        this.add('overworld', overWorldScene);

        // Go to the new scene
        this.goToScene('overworld');
    }
    goToLevel3() {
        // Create and add the new scene
        const level3 = new Level3(this);
        this.add('level3', level3);

        // Go to the new scene
        this.goToScene('level3');
    }
    goToLevel4() {
        // Create and add the new scene
        const level4 = new Level4(this);
        this.add('level4', level4);

        // Go to the new scene
        this.goToScene('level4');
    }
    goToLevel1() {
        // Create and add the new scene
        const level1 = new Level1(this);
        this.add('level1', level1);

        // Go to the new scene
        this.goToScene('level1');
    }

    goToLevel2() {
        // Create and add the new scene
        const level2 = new Level2(this);
        this.add('level2', level2);

        // Go to the new scene
        this.goToScene('level2');
    }

}

new Game()
