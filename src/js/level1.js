import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
import { Spider } from "./Spider.js";
import { Door } from "./door.js";
export class Level1 extends Scene {

    player
    bat
    spider
    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.player = new Player();
        this.player.pos = new Vector(400, 400);
        this.add(this.player);

        Resources.Level1.addToScene(this);
        this.spider = new Spider();
        this.spider.pos = new Vector(300, 300);
        this.add(this.spider);

        this.door = new Door(347.83, 120, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}