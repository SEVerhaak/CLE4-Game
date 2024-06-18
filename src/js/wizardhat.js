import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Engine,
    Graphic,
    Input,
    Keys,
    Random,
    range,
    SpriteSheet,
    Vector
} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Player } from "./player.js";
import { Flower } from "./flowers.js";
import { Chest } from "./chest.js";
import { Hat } from "./hat.js";


export class WizardHat extends Hat {
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.WizardHat,
        grid: {
            rows: 9,
            columns: 6,
            spriteWidth: 60,
            spriteHeight: 60
        },

    })
    graphic = Animation.fromSpriteSheet(spriteSheet, range(0, 0), 100);


    constructor() {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, x: -1, y: -8, z: 999
        });
        this.scale = new Vector(0.3, 0.3)
    }


}