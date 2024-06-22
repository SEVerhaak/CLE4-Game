import {
    SpriteSheet,
    CollisionType, AnimationStrategy, Vector
} from "excalibur";
import {Resources} from "../resources.js";
import {Projectile} from "./projectile.js";

export class FireProjectile1 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.11
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
    animStrat = AnimationStrategy.Loop
    delay = 25
    range = 5000
    speed = 2
    canPassThrough = true
    reloadTime = 250


    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity.scale(new Vector(this.speed, this.speed))
        this.pos = pos
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

}
