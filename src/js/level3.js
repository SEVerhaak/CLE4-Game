import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
import { Door } from "./door.js";
import {Pickup} from "./pickup.js";
import {NectarPickup} from "./nectarPickup.js";
import {ProjectilePickup} from "./pickupProjectileTest.js";

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
        this.player = new Player(this.game);
        this.player.pos = new Vector(350, 165);
        this.add(this.player);

        const pickup = new ProjectilePickup(425,425)
        this.add(pickup)

        const pickup2 = new ProjectilePickup(440,425)
        this.add(pickup2)

        Resources.Level3.addToScene(this);
        this.bat = new Bat(this);
        this.bat.pos = new Vector(350, 400);
        this.add(this.bat);

        this.door = new Door(347.83, 120, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}