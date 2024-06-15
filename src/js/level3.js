import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
import { Door } from "./door.js";

export class Level3 extends Scene {

    player
    bat
    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);


        Resources.Level3.addToScene(this);
        this.bat = new Bat(this);
        this.bat.pos = new Vector(300, 300);
        this.add(this.bat);
        this.player = new Player(this.game);
        this.player.pos = new Vector(400, 400);
        this.add(this.player);

        this.door = new Door(347.83, 120, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}