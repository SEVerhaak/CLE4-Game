import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "../player.js";
import { Resources, ResourceLoader } from '../resources.js'
import { Bat } from "../enemies/bat.js";
import { Door } from "../door.js";
import { Pickup } from "../pickups/pickup.js";
import { NectarPickup } from "../pickups/nectarPickup.js";
import { ProjectilePickup } from "../pickups/pickupProjectileTest.js";
import { FireProjectile2Pickup } from "../pickups/FireProjectile2Pickup.js";
import { FireProjectile3Pickup } from "../pickups/FireProjectile3Pickup.js";

export class Level3 extends Scene {

    player
    bat
    game
    engine
    name

    constructor(game, engine) {
        super();
        this.game = game
        this.engine = engine;
        this.name = "enterlevel3"
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        Resources.Worldmusic.stop()
        Resources.Levelbossmusic.play()

        const pickup = new ProjectilePickup(400, 425)
        this.add(pickup)

        const pickup2 = new FireProjectile2Pickup(450, 425)
        this.add(pickup2)

        const pickup3 = new FireProjectile3Pickup(500, 425)
        this.add(pickup3)

        Resources.Level3.addToScene(this);

        this.bat = new Bat(this, this.game);
        this.bat.pos = new Vector(120, 400);
        this.add(this.bat);


        this.door = new Door(347.83, 120, this.game);
        this.add(this.door);
    }
    onDeactivate(context) {
        super.onDeactivate(context)
        console.log('deactivate')
        this.player.kill()
        Resources.Levelbossmusic.stop()

    }
    onActivate(context) {
        super.onActivate(context)
        console.log('activate')
        this.cameraDelay(this.engine)
        this.player = new Player(this.game)
        this.player.pos = new Vector(400, 200)
        this.add(this.player)
        Resources.Levelbossmusic.play()
        Resources.Levelbossmusic.loop = true;

    }
    cameraDelay(engine) {
        setTimeout(() => {
            engine.currentScene.camera.strategy.lockToActor(this.player);
            engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(-300, -300, 2500, 3000)); // Set the game bounds
            engine.currentScene.camera.zoom = 4;
        }, 10);
    }
}