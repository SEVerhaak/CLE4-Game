import { Actor, Animation, AnimationStrategy, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class Phoenix extends Enemy {
    currentAnimation = null;
    detectionRadius = 120; // Radius to detect the player
    attackradius = 70;
    normalSpeed = 50; // Normal movement speed
    attackSpeed = 80; // Movement speed when attacking

    constructor() {
        super({
            width: 5, height: 5, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(2, 2);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        // Spritesheets
        const spriteSheetphoenix = SpriteSheet.fromImageSource({
            image: Resources.Phoenix,
            grid: {
                columns: 6,
                rows: 4,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });



        // Load movement animations
        this.animationRight = Animation.fromSpriteSheet(spriteSheetphoenix, range(0, 5), 100);
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetphoenix, range(0, 5), 100);
        this.animationLeft.flipHorizontal = true;
        this.animationAttack = Animation.fromSpriteSheet(spriteSheetphoenix, range(0, 5), 100);
        this.animationDeath = Animation.fromSpriteSheet(spriteSheetphoenix, range(6, 11), 100, AnimationStrategy.Freeze);

        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
}
