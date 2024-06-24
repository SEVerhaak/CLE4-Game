import {
    SpriteSheet,
    CollisionType, AnimationStrategy, Vector, ParticleEmitter, EmitterType, Color
} from "excalibur";
import {Resources} from "../resources.js";
import {Projectile} from "./projectile.js";

export class FireProjectile4 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.3
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.FireProjectile4,
        grid: {
            columns: 5,
            rows: 1,
            spriteWidth: 16,
            spriteHeight: 16
        },
    });
    animEndFrame = 4
    scaleModifier = 1
    animStrat = AnimationStrategy.Freeze
    delay = 100
    range = 1000
    speed = 0.5
    canPassThrough = false
    isExplosive = false;
    reloadTime = 1000
    sound = [Resources.WooshLarge]

    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity.scale(new Vector(this.speed, this.speed))
        this.pos = pos
    }

}
