import {
    Actor,
    Engine,
    Vector,
    SpriteSheet,
    Animation,
    range,
    AnimationStrategy,
    CollisionType, randomIntInRange
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
    range
    speed
    canPassThrough
    reloadTime
    isExplosive
    sound


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
        this.sound[randomIntInRange(0, this.sound.length - 1)].play(0.7)
        this.killDelay();
    }

    killDelay(){
        setTimeout(() => {
            this.kill()
        }, this.range);
    }

}
