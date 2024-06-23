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
        this.moveDown();
    }
    moveDown() {
        // Move down 2 units over 200ms
        this.actions.moveTo(-0.5, -12.5, 7).callMethod(() => {
            this.moveUp();
        });
    }

    moveUp() {
        // Move up 2 units over 200ms
        this.actions.moveTo(-0.5, -11.5, 7).callMethod(() => {
            this.moveDown();
        });
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
