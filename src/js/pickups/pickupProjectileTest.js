import {
    Actor,
    Vector,
    CollisionType, Sprite
} from "excalibur";
import {Resources} from "../resources.js";
import {Player} from "../player.js";
import {Pickup} from "./pickup.js";
import {FireProjectile1} from "../projectiles/fireProjectile1.js";

export class ProjectilePickup extends Pickup {

    sprite = new Sprite({
        image: Resources.TestProjectile,
        sourceView: {
            // Take a small slice of the source image starting at pixel (10, 10) with dimension 20 pixels x 20 pixels
            x: 0,
            y: 0,
            width: 16,
            height: 16,
        },
    })
    itemName = 'fireProjectile1'
    scaleVec = new Vector(1, 1)
    isProjectile = true
    projectileIndex = 0;
    projectileSprite = Resources.TestProjectile
    endFrame = 3

    constructor(x,y) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        //this.scale = new Vector(0.005, 0.005);
        this.pos.x = x;
        this.pos.y = y;
        this.z = 99;
    }
}
