import { Actor, Animation, CollisionType, Engine, Input, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Player } from "./player";

export class Door extends Actor {
    game
    constructor(x, y, game) {
        super({
            width: 24, height: 20, collisionType: CollisionType.Passive, z: 999, x: x, y: y
        });
        this.game = game;
    }

    onInitialize(engine) {

        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
    onCollisionStart(evt) {
        if (evt.other instanceof Player) {
            evt.other.kill()
            this.game.goToOverWorld();
        }
    }

}