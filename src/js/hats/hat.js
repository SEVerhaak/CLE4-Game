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
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class Hat extends Actor {
    spriteSheet
    graphic
    icon


    constructor(x, y) {
        super({ width: 8, height: 8, collisionType: CollisionType.Passive, x: x, y: y });
        //this.vel = velocity
        this.z = 999
    }

    onInitialize(engine) {
        //this.sprite = this.graphics.use(Resources.Nectar.toSprite())
        // this.animation = Animation.fromSpriteSheet(this.spriteSheet, range(0, 0), this.delay, this.animStrat);
        this.graphics.use(this.graphic)
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }
    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            this.kill();
            evt.other.hatHandler(this)
        }
    }
}
