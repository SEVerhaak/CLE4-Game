import {
    SpriteSheet,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";
import {Projectile} from "./projectile.js";

export class FireProjectile1 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.1
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.TestProjectile,
        grid: {
            columns: 4,
            rows: 1,
            spriteWidth: 16,
            spriteHeight: 16
        },
    });
    animEndFrame = 3
    scaleModifier = 0.5

    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity
        this.pos = pos
    }
}
