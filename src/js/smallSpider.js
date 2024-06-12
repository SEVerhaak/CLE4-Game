import { Actor, Animation, AnimationStrategy, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class TinySpider extends Actor {
    currentAnimation = null;
    detectionRadius = 120; // Radius to detect the player
    attackradius = 70;
    normalSpeed = 120; // Normal movement speed
    attackSpeed = 120; // Movement speed when attacking

    constructor() {
        super({
            width: 5, height: 5, collisionType: CollisionType.Passive, z: 20
        });
        this.scale = new Vector(0.5, 0.5);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
        super.onInitialize(engine);

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
            image: Resources.tinySpider,
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

        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));

        this.changeDirection();
    }

    changeDirection() {
        
            const directions = [
                new Vector(1, 0),   // Right
                new Vector(-1, 0),  // Left
                new Vector(0, 1),   // Down
                new Vector(0, -1),  // Up
                new Vector(0, 0),    // Still
                new Vector(1, 1),
                new Vector(-1, -1),
                new Vector(1, -1),
                new Vector(-1, 1),
            ];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            this.direction = randomDirection;
            this.updateAnimation(); // Update animation based on direction
        
    }

    updateAnimation() {
        
            if (this.direction.equals(new Vector(1, 0))) {
                if (this.currentAnimation !== this.animationRight) {
                    this.graphics.use(this.animationRight);
                    this.currentAnimation = this.animationRight;
                }
            } else if (this.direction.equals(new Vector(-1, 0))) {
                if (this.currentAnimation !== this.animationLeft) {
                    this.graphics.use(this.animationLeft);
                    this.currentAnimation = this.animationLeft;
                }
            }
        
    }
    onPreUpdate(engine, delta) {
       
                        this.timeSinceLastChange += delta;
                        if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                            this.changeDirection();
                            this.timeSinceLastChange = 0;
                        }
                        this.vel = this.direction.scale(this.normalSpeed);
                
                    }
}
