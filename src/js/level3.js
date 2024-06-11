import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
export class Level3 extends Scene {

    player
    bat

    constructor() {
        super();
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        Resources.Level3.addToScene(this);
        this.player = new Player();
        this.player.pos = new Vector(400, 400);
        this.add(this.player);
        this.bat = new Bat();
        this.bat.pos = new Vector(400, 400);
        this.add(this.bat);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}