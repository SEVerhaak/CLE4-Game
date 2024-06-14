import {
    Actor,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";
import {Pickup} from "./pickup.js";
import {FireProjectile1} from "./fireProjectile1.js";

export class ProjectilePickup extends Pickup {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    itemName = 'fireProjectile1'
    scaleVec = new Vector(0.01, 0.01)
    isProjectile = true
    projectileIndex = 0;

    constructor(x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }
}
