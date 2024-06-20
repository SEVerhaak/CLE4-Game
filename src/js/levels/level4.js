import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "../player.js";
import { Resources, ResourceLoader } from '../resources.js'
import { Pigeon } from "../enemies/pigeon.js";
import { Door } from "../door.js";

export class Level4 extends Scene {

    player
    pigeon
    game
    engine
    name

    constructor(game, engine) {
        super();
        this.game = game
        this.engine = engine
        this.name = "enterlevel4"
    }

    onInitialize(engine) {
        super.onInitialize(engine);



        Resources.Level4.addToScene(this);
        this.pigeon = new Pigeon(this, this.game);
        this.pigeon.pos = new Vector(300, 300);
        this.add(this.pigeon);


        this.door = new Door(302, 50, this.game);
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
        this.player.pos = new Vector(300, 110)
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