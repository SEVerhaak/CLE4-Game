import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./enemies/bat.js";
import { Spider } from "./enemies/Spider.js";
import { Door } from "./door.js";
import { TinySpider } from "./enemies/smallSpider.js";
export class Mainscene extends Scene {

    player
    bat
    spider
    game
    tinyspider

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.player = new Player(this.game);
        this.player.pos = new Vector(400, 400);
        this.add(this.player);

        Resources.MainScene.addToScene(this);
        

       

        
        

        this.door = new Door(301, 50, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}