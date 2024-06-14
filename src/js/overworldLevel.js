import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources } from "./resources.js";

export class OverworldLevel extends Scene {

    player

    constructor() {
        super();
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.player = new Player();
        this.player.pos = new Vector(400, 400);
        this.add(this.player);
        Resources.MainScene.addToScene(this);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}