import {
    Actor,
    Engine,
    Vector,
    SpriteSheet,
    Animation,
    range,
    AnimationStrategy,
    CollisionType
} from "excalibur";
import {Resources} from "../resources.js";

export class Projectile extends Actor {

    sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0.1
    spriteSheet
    animEndFrame
    scaleModifier
    animStrat
    delay


    constructor(velocity, pos) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive});
        this.scale = new Vector(1, 1);
        //this.vel = velocity
        this.z = 999
    }

    onInitialize(engine) {
        //this.sprite = this.graphics.use(Resources.Nectar.toSprite())
        this.animation = Animation.fromSpriteSheet(this.spriteSheet, range(0, this.animEndFrame), this.delay, this.animStrat);
        this.graphics.use(this.animation)
        this.scale = new Vector(this.scaleModifier, this.scaleModifier)
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }
}
