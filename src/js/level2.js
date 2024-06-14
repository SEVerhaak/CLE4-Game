import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
import { Spider } from "./Spider.js";
import { Door } from "./door.js";
import { Phoenix } from "./phoenix.js";
export class Level2 extends Scene {

    player
    bat
    spider
    game
    phoenix

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.player = new Player(this.game);
        this.player.pos = new Vector(375, 135);
        this.add(this.player);

        Resources.Level2.addToScene(this);
        this.phoenix = new Phoenix(this);
        this.phoenix.pos = new Vector(300, 300);
        this.add(this.phoenix);

        this.door = new Door(373, 100, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}