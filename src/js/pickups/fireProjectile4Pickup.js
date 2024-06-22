import {
    Actor,
    Vector,
    CollisionType, Sprite
} from "excalibur";
import {Resources} from "../resources.js";
import {Player} from "../player.js";
import {Pickup} from "./pickup.js";
import {FireProjectile1} from "../projectiles/fireProjectile1.js";

export class FireProjectile4Pickup extends Pickup {

    sprite = new Sprite({
        image: Resources.FireProjectile4,
        sourceView: {
            // Take a small slice of the source image starting at pixel (10, 10) with dimension 20 pixels x 20 pixels
            x: 50,
            y: 0,
            width: 16,
            height: 16,
        },
    })
    itemName = 'fireProjectile4'
    scaleVec = new Vector(1, 1)
    isProjectile = true
    projectileIndex = 3;
    projectileSprite = Resources.FireProjectile4
    endFrame = 3

    constructor(x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }
}
