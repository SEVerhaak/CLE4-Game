import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "../player.js";
import { Resources, ResourceLoader } from '../resources.js'
import { Bat } from "../enemies/bat.js";
import { Spider } from "../enemies/Spider.js";
import { Door } from "../door.js";
import { TinySpider } from "../enemies/smallSpider.js";
export class Level1 extends Scene {

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
        this.player.pos = new Vector(302, 85);
        this.add(this.player);

        Resources.Level1.addToScene(this);
        this.spider = new Spider(this, this.game);
        this.spider.pos = new Vector(300, 300);
        this.add(this.spider);


        for(let i = 0; i < 50 ;i++){
            this.tinyspider = new TinySpider();
            this.tinyspider.pos = new Vector((300+i), 350);
            this.add(this.tinyspider);

        }

        
        

        this.door = new Door(301, 50, this.game);
        this.add(this.door);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}