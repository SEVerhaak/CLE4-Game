import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources, ResourceLoader } from './resources.js'
import { Bat } from "./bat.js";
import { Spider } from "./Spider.js";
import { Door } from "./door.js";
import { TinySpider } from "./smallSpider.js";
export class EndcreditScene extends Scene {

    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
      

        Resources.Level1.addToScene(this);
        

        }

        
        

       
    }