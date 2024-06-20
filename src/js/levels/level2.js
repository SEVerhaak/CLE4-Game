import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "../player.js";
import { Resources, ResourceLoader } from '../resources.js'
import { Bat } from "../enemies/bat.js";
import { Spider } from "../enemies/Spider.js";
import { Door } from "../door.js";
import { Phoenix } from "../enemies/phoenix.js";
export class Level2 extends Scene {

    player
    bat
    spider
    game
    phoenix
    engine
    name

    constructor(game, engine) {
        super();
        this.game = game
        this.engine = engine
        this.name = "enterlevel2"
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        Resources.Level2.addToScene(this);
        this.phoenix = new Phoenix(this, this.game);
        this.phoenix.pos = new Vector(300, 300);
        this.add(this.phoenix);

        this.door = new Door(373, 100, this.game);
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
        this.player.pos = new Vector(375, 135)
        this.add(this.player)
        Resources.Levelbossmusic.play()

    }
    cameraDelay(engine) {
        setTimeout(() => {
            engine.currentScene.camera.strategy.lockToActor(this.player);
            engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(-300, -300, 2500, 3000)); // Set the game bounds
            engine.currentScene.camera.zoom = 4;
        }, 10);
    }
}