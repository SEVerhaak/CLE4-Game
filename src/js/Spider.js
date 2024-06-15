import { Actor, Animation, AnimationStrategy, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class Spider extends Enemy {
    currentAnimation = null;
    detectionRadius = 120; // Radius to detect the player
    attackradius = 70;
    normalSpeed = 50; // Normal movement speed
    attackSpeed = 70; // Movement speed when attacking
    animationHurt

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
        this.collider.useBoxCollider(
            10, 8, new Vector(0, 0), new Vector(-5, 8)
        )

        // Spritesheets
        const spriteSheetSpiderWalk = SpriteSheet.fromImageSource({
            image: Resources.SpiderWalk,
            grid: {
                columns: 4,
                rows: 4,
                spriteWidth: 256,
                spriteHeight: 144
            },
        });
        const spriteSheetSpiderAttack = SpriteSheet.fromImageSource({
            image: Resources.SpiderAttack,
            grid: {
                columns: 6,
                rows: 5,
                spriteWidth: 256,
                spriteHeight: 144
            },
        });
        const spriteSheetSmallSpider = SpriteSheet.fromImageSource({
            image: Resources.SmallSpider,
            grid: {
                columns: 9,
                rows: 16,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });

        // Load movement animations
        this.animationRight = Animation.fromSpriteSheet(spriteSheetSmallSpider, range(9, 14), 100);
        this.animationLeft = Animation.fromSpriteSheet(spriteSheetSmallSpider, range(9, 14), 100);
        this.animationRight.flipHorizontal = true;
        this.animationAttack = Animation.fromSpriteSheet(spriteSheetSmallSpider, range(90, 98), 100);
        this.animationDeath = Animation.fromSpriteSheet(spriteSheetSmallSpider, range(54, 62), 100, AnimationStrategy.Freeze);
        this.animationHurt = Animation.fromSpriteSheet(spriteSheetSmallSpider, range(108, 111), 100)

        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }
}
