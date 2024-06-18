import {
    SpriteSheet,
    CollisionType, AnimationStrategy
} from "excalibur";
import {Resources} from "../resources.js";
import {Projectile} from "./projectile.js";

export class FireProjectile2 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.1
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.FireProjectile2,
        grid: {
            columns: 4,
            rows: 1,
            spriteWidth: 16,
            spriteHeight: 12
        },
    });
    animEndFrame = 3
    scaleModifier = 0.5
    animStrat = AnimationStrategy.Loop
    delay = 25

    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity
        this.pos = pos
    }
}
