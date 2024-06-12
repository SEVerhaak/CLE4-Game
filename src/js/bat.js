import { Actor, Animation, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class Bat extends Enemy {
    currentAnimation = null;
    detectionRadius = 70; // Radius to detect the player
    attackradius = 50;
    normalSpeed = 50; // Normal movement speed
    attackSpeed = 80; // Movement speed when attacking

    animationRight
    animationLeft
    animationAttack

    constructor() {
        super();

    }


    onInitialize(engine) {
        super.onInitialize(engine);
        // Spritesheets
        const spriteSheetBatFly = SpriteSheet.fromImageSource({
            image: Resources.BatFly,
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });
        const spriteSheetBatAttack = SpriteSheet.fromImageSource({
            image: Resources.BatAttack,
            grid: {
                columns: 8,
                rows: 1,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });

        // Load movement animations
        this.animationRight = Animation.fromSpriteSheet(spriteSheetBatFly, range(0, 3), 100);
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetBatFly, range(0, 3), 100);
        this.animationLeft.flipHorizontal = true;
        this.animationAttack = Animation.fromSpriteSheet(spriteSheetBatAttack, range(0, 7), 100);

        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
    }
}
