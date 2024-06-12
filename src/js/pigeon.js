import { Actor, Animation, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

export class Pigeon extends Enemy {
    currentAnimation = null;
    detectionRadius = 70; // Radius to detect the player
    attackradius = 50;
    normalSpeed = 50; // Normal movement speed
    attackSpeed = 80; // Movement speed when attacking

    constructor() {
        super({
            width: 10, height: 10, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(2, 2);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {
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
        this.changeDirection();
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    changeDirection() {
        const directions = [
            new Vector(1, 0),   // Right
            new Vector(-1, 0),  // Left
            new Vector(0, 1),   // Down
            new Vector(0, -1),  // Up
            new Vector(0, 0)    // Still
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
        let playerFound = false;
        let playerPosition = 0; // Initialize player position

        engine.currentScene.actors.forEach(actor => {
            if (actor instanceof Player) {
                playerFound = true;
                const distanceToPlayer = this.pos.distance(actor.pos);

                if (distanceToPlayer <= this.detectionRadius) {
                    this.collisionType = CollisionType.Passive;
                    this.direction = actor.pos.sub(this.pos).normalize();
                    playerPosition = actor.pos.x - this.pos.x; // Calculate player position relative to the bat
                    this.animationAttack.flipHorizontal = !(playerPosition > 0);
                    if (!(playerPosition > 0)) {
                        this.graphics.use(this.animationLeft)
                        this.currentAnimation = this.animationLeft
                    } else {
                        this.graphics.use(this.animationRight)
                        this.currentAnimation = this.animationRight
                    }
                    if (distanceToPlayer <= this.attackradius) {
                        // Set animation flip based on player position relative to the bat
                        this.graphics.use(this.animationAttack);
                        this.currentAnimation = this.animationAttack;
                        this.vel = this.direction.scale(this.attackSpeed);
                    } else {
                        this.vel = this.direction.scale(this.normalSpeed);
                    }
                } else {
                    this.collisionType = CollisionType.Active;
                    this.timeSinceLastChange += delta;
                    if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                        this.changeDirection();
                        this.timeSinceLastChange = 0;
                    }
                    this.vel = this.direction.scale(this.normalSpeed);
                }
            }

        });

        if (!playerFound) {
            this.timeSinceLastChange += delta;
            if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                this.changeDirection();
                this.timeSinceLastChange = 0;
            }
            this.vel = this.direction.scale(this.normalSpeed);
        }
    }

}
