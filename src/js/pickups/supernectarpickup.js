import {
    Actor,
    Vector,
    CollisionType, Sprite
} from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";
import { Pickup } from "./pickup.js";

export class SuperNectarPickup extends Pickup {

    sprite = new Sprite({
        image: Resources.SuperNectar,
    })
    itemName = 'SuperNectar'
    scaleVec = new Vector(0.15, 0.15)
    isSuperNectar = true;
    constructor(x, y) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive });
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 999;
    }
}
