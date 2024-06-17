import {
    SpriteSheet,
    CollisionType, Animation, AnimationStrategy
} from "excalibur";
import {Resources} from "./resources.js";
import {Projectile} from "./projectile.js";

export class FireProjectile3 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.1
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.FireProjectile3,
        grid: {
            columns: 3,
            rows: 2,
            spriteWidth: 16,
            spriteHeight: 16
        },
    });
    animEndFrame = 5
    scaleModifier = 0.5

    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity
        this.pos = pos
    }
}
