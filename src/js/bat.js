import { Actor, Animation, CollisionType, Engine, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";

export class Bat extends Enemy {
    currentAnimation = null;
    target = null;
    detectionRadius = 100; // Radius to detect the player
    score = 0;

    constructor() {
        super({
            width: 32, height: 32, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(2, 2);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
    }

    onInitialize(engine) {

        // spritesheets
        const spriteSheetBatFly = SpriteSheet.fromImageSource({
            image: Resources.BatFly, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 32,
                spriteHeight: 32
            },
        });

        // laad bewegings animaties in
        this.animationRight = Animation.fromSpriteSheet(spriteSheetBatFly, range(0, 3), 100);
        // standaard start animatie
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        this.changeDirection();
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
            if (this.currentAnimation !== this.runAnimationRight) {
                this.graphics.use(this.runAnimationRight);
                this.currentAnimation = this.animationRight;
            }
        } else if (this.direction.equals(new Vector(-1, 0))) {
            if (this.currentAnimation !== this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeft);
                this.currentAnimation = this.graphics.flipHorizontal;
            }
        }
        //else if (this.direction.equals(new Vector(0, 1))) {
        //     if (this.currentAnimation !== this.runAnimationDown) {
        //         this.graphics.use(this.runAnimationDown);
        //         this.currentAnimation = this.runAnimationDown;
        //     }
        // } else if (this.direction.equals(new Vector(0, -1))) {
        //     if (this.currentAnimation !== this.runAnimationTop) {
        //         this.graphics.use(this.runAnimationTop);
        //         this.currentAnimation = this.runAnimationTop;
        //     }
        // } else if (this.direction.equals(new Vector(0, 0))) {
        //     if (this.currentAnimation !== this.AnimationPhone) {
        //         this.graphics.use(this.AnimationPhone);
        //         this.currentAnimation = this.AnimationPhone;
        //     }
        // }
    }

    onPreUpdate(engine, delta) {
        let nearestPlayer = null;
        let minDistance = Number.MAX_VALUE;


        engine.currentScene.actors.forEach(actor => {
            if (actor instanceof Player) {
                const distanceToPlayer = this.pos.distance(actor.pos);
                if (distanceToPlayer < minDistance) {
                    minDistance = distanceToPlayer;
                    nearestPlayer = actor;
                }
            }
        });

        if (nearestPlayer) {
            const distanceToPlayer = minDistance;
            if (distanceToPlayer <= this.detectionRadius) {
                this.direction = nearestPlayer.pos.sub(this.pos).normalize();
                this.updateAnimation();
            } else {
                this.timeSinceLastChange += delta;
                if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                    this.changeDirection();
                    this.timeSinceLastChange = 0;
                }
            }
        }

        const movementSpeed = 100;
        this.vel = this.direction.scale(movementSpeed);
    }

}