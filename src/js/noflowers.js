import { Actor, Animation, CollisionType, Engine, Input, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Player } from "./player";
import { Flower } from "./flowers";
import { Chest } from "./chest";

export class noFlower extends Actor {
    game
    constructor(width, height, x, y,) {
        super({
            width: width, height: height, collisionType: CollisionType.Passive, z: 999, x: x, y: y
        });
    }

    onInitialize(engine) {

        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
    onCollisionStart(evt) {
        if (evt.other instanceof Flower) {
            evt.other.kill();
        }
        if (evt.other instanceof Chest) {
            evt.other.kill();
        }
    }

}