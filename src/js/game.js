import '../css/style.css'
import { Actor, Engine, AnimationStrategy, Vector, DisplayMode, Color, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { OverworldLevel } from "./levels/overworldLevel.js";
import { Level3 } from './levels/level3.js';
import { Level4 } from './levels/level4.js';
import { Level1 } from './levels/level1.js';
import { Level2 } from './levels/level2.js';
import { EndcreditScene } from './endcreditscene.js';
import { StoryScene } from './storyscene.js';
import { Inventory } from "./inventory.js";
import { GameOverScene } from './gameoverscene.js';
import { StartScene } from './startScene.js';
import { Player } from "./player.js";
import { Endscene } from './endscene.js';
import { ControlScene } from './controlScene.js';

export class Game extends Engine {

    inventory

    constructor() {
        super({
            width: 1440,
            height: 900,
            maxFps: 60,
            displayMode: DisplayMode.FitScreenAndFill,
            antialiasing: false,
            backgroundColor: Color.Black
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.inventory = new Inventory(engine, 0, 0)
        this.add(this.inventory)

        engine.input.gamepads.setMinimumGamepadConfiguration({
            axis: 4,
            buttons: 6,
        });
        engine.input.gamepads.enabled = true;

        engine.input.gamepads.on('connect', (connectEvent) => {
            console.log('controllers connected')
            this.goToOverWorld(this);
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
        this.goToLevel1(this);
        this.goToLevel2(this);
        this.goToLevel3(this);
        this.goToLevel4(this);
        this.goToGameOverScene(this);
        this.goToOverWorld(this)
        //this.goToControlScene();
        //this.goToEndscene();
        this.goToStartScene();
    }

    goToOverWorld() {
        // Create and add the new scene
        const overWorldScene = new OverworldLevel(this);
        this.add('overworld', overWorldScene);

        // Go to the new scene
        this.goToScene('overworld');
    }
    goToLevel3() {
        // Create and add the new scene
        const level3 = new Level3(this);
        this.add('level3', level3);
    }
    goToLevel4() {
        // Create and add the new scene
        const level4 = new Level4(this);
        this.add('level4', level4);
    }
    goToLevel1() {
        // Create and add the new scene
        const level1 = new Level1(this);
        this.add('level1', level1);
    }

    goToLevel2() {
        // Create and add the new scene
        const level2 = new Level2(this);
        this.add('level2', level2);
    }

    goToStartScene() {
        const startScene = new StartScene(this);
        this.add('startScene', startScene);

        this.goToScene('startScene');
    }

    goToControlScene() {
        const controlScene = new ControlScene(this);
        this.add('controlScene', controlScene);

        this.goToScene('controlScene');
    }


    goToGameOverScene() {
        // Create and add the new scene
        const GameOver = new GameOverScene(this);
        this.add('GameOver', GameOver);
    }

    goToEndcredits() {
        // Create and add the new scene
        const endcredit = new EndcreditScene(this);
        this.add('endcredit', endcredit);

        // Go to the new scene
        this.goToScene('endcredit');
    }


    goToStoryScene() {
        // Create and add the new scene
        const storyscene = new StoryScene(this);
        this.add('storyscene', storyscene);

        // Go to the new scene
        this.goToScene('storyscene');
    }

    goToEndscene() {
        // Create and add the new scene
        const endscene = new Endscene(this);
        this.add('endscene', endscene);

        // Go to the new scene
        this.goToScene('endscene');
    }

    death() {

    }

}

new Game()
