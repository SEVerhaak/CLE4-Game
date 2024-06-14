import { Actor, Animation, AnimationStrategy, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class Pigeon extends Enemy {
    currentAnimation = null;
    detectionRadius = 70; // Radius to detect the player
    attackradius = 50;
    normalSpeed = 50; // Normal movement speed
    attackSpeed = 80; // Movement speed when attacking

    animationRight
    animationLeft
    animationAttack
    animationDeath

    constructor() {
        super({
            width: 30, height: 20, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(1, 1);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        // Spritesheets
        const spriteSheetPigeonFly = SpriteSheet.fromImageSource({
            image: Resources.PigeonFly,
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });
        const spriteSheetPigeonAttack = SpriteSheet.fromImageSource({
            image: Resources.PigeonAttack,
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });
        const spriteSheetPigeonDeath = SpriteSheet.fromImageSource({
            image: Resources.PigeonDeath,
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });

        // Load movement animations
        this.animationRight = Animation.fromSpriteSheet(spriteSheetPigeonFly, range(0, 3), 100);
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetPigeonFly, range(0, 3), 100);
        this.animationRight.flipHorizontal = true;
        this.animationAttack = Animation.fromSpriteSheet(spriteSheetPigeonAttack, range(0, 3), 100);
        this.animationDeath = Animation.fromSpriteSheet(spriteSheetPigeonDeath, range(0, 3), 100, AnimationStrategy.Freeze);


        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
}