import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "../player.js";
import { Resources, ResourceLoader } from '../resources.js'
import { Bat } from "../enemies/bat.js";
import { Door } from "../door.js";
import {Pickup} from "../pickup.js";
import {NectarPickup} from "../nectarPickup.js";
import {ProjectilePickup} from "../enemies/pickupProjectileTest.js";
import {FireProjectile2Pickup} from "../FireProjectile2Pickup.js";
import {FireProjectile3Pickup} from "../FireProjectile3Pickup.js";

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
        this.player.pos = new Vector(400, 400);
        this.add(this.player);

        const pickup = new ProjectilePickup(400,425)
        this.add(pickup)

        const pickup2 = new FireProjectile2Pickup(450,425)
        this.add(pickup2)

        const pickup3 = new FireProjectile3Pickup(500,425)
        this.add(pickup3)

        Resources.Level3.addToScene(this);

        this.bat = new Bat(this, this.game);
        this.bat.pos = new Vector(120, 400);
        this.add(this.bat);


        this.door = new Door(347.83, 120, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}