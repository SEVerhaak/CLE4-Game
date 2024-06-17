import { Actor, Animation, CollisionType, Engine, Input, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";

export class EnterLevel extends Actor {
    game
    constructor(x, y, game, level) {
        super({
            width: 24, height: 20, collisionType: CollisionType.Passive, z: 30, x: x, y: y
        });
        this.game = game;
        this.level = level;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door.toSprite())
        this.on('collisionstart', (evt) => this.onCollisionStart(evt, this.game, this.level));
    }
    onCollisionStart(evt, game, level) {
        if (evt.other instanceof Player) {
            console.log(game)
            if (level === 1) {
                game.goToLevel1();
            }
            if (level === 2) {
                game.goToLevel2();
            }
            if (level === 3) {
                game.goToLevel3();
            }
            if (level === 4) {
                game.goToLevel4();
            }

        }
    }

}