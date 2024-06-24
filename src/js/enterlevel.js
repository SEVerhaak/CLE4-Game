import { Actor, Animation, CollisionType, Engine, Input, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";

export class EnterLevel extends Actor {
    game
    name
    constructor(x, y, game, level, name) {
        super({
            width: 24, height: 20, collisionType: CollisionType.Passive, z: 30, x: x, y: y
        });
        this.game = game;
        this.level = level;
        this.name = name;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door.toSprite())
        this.on('collisionstart', (evt) => this.onCollisionStart(evt, this.game, this.level));
    }
    onCollisionStart(evt, game, level) {
        if (evt.other instanceof Player) {
            if (level === 1) {
                this.game.goToScene('level1');
            }
            if (level === 2) {
                this.game.goToScene('level2');
            }
            if (level === 3) {
                this.game.goToScene('level3');
            }
            if (level === 4) {
                this.game.goToScene('level4');
            }

        }
    }

}