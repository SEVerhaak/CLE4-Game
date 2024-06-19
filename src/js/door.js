import { Actor, Animation, CollisionType, Engine, Input, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Player } from "./player";
import { Resources, ResourceLoader } from './resources.js'

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
            Resources.Levelbossmusic.stop()
            Resources.Worldmusic.play()
            this.game.goToScene('overworld');
        }
    }

}