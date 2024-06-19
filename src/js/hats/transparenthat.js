import {CollisionType, Vector} from "excalibur";
import { Resources, ResourceLoader } from '../resources.js'
import { Hat } from "./hat.js";


export class Transparenthat extends Hat {
    graphic = Resources.Transparent.toSprite();
    icon = Resources.Transparent
    name

    constructor(x, y) {
        super({
            width: 45, height: 30, collisionType: CollisionType.Passive, z: 999
        });
        this.scale = new Vector(0.5, 0.5)
        this.pos = new Vector(x, y)
        this.name = "ignore";
    }
}