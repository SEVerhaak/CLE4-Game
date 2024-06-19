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
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "../player.js";
import { Flower } from "../flowers.js";
import { Chest } from "../chest.js";
import { Hat } from "./hat.js";


export class SombreroHat extends Hat {
    graphic = Resources.SombreroHat.toSprite();
    icon = Resources.SombreroIcon
    name

    constructor(x, y) {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, z: 999
        });
        this.scale = new Vector(0.03, 0.03)
        this.pos = new Vector(x, y)
        this.name = "sombrerohat";
    }


}



