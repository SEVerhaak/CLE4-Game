import {
    Actor,
    Vector,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";
import {Pickup} from "./pickup.js";
import {FireProjectile1} from "./projectiles/fireProjectile1.js";

export class FireProjectile2Pickup extends Pickup {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    itemName = 'fireProjectile2'
    scaleVec = new Vector(0.015, 0.015)
    isProjectile = true
    projectileIndex = 1;
    projectileSprite = Resources.FireProjectile2
    endFrame = 3


    constructor(x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }
}
