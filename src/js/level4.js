import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Pigeon } from "./pigeon.js";
import { Door } from "./door.js";

export class Level4 extends Scene {

    player
    pigeon
    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);


        Resources.Level4.addToScene(this);
        this.pigeon = new Pigeon(this);
        this.pigeon.pos = new Vector(300, 300);
        this.add(this.pigeon);
        this.player = new Player(this.game);
        this.player.pos = new Vector(400, 400);
        this.add(this.player);

        this.door = new Door(302, 50, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}