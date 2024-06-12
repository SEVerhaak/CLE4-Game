import { Actor, Animation, CollisionType, Engine, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Player } from "./player.js";
import { Healthbar } from "./healthBar.js";
import { Projectile } from "./projectile.js";

export class Enemy extends Actor {
    currentAnimation
    detectionRadius
    attackradius
    normalSpeed
    attackSpeed

    animationDeath
    animationRight
    animationLeft
    animationAttack
    animationHurt
    healthBar
    health = 1;
    scene

    constructor(scene) {
        super({
            width: 10, height: 10, collisionType: CollisionType.Active, z: 999
        });
        this.scale = new Vector(2, 2);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
        this.scene = scene;
    }

    onInitialize(engine) {
        this.healthBar = new Healthbar();
        this.addChild(this.healthBar);
        this.healthBar.pos = new Vector(-8, -17);
        this.healthBar.z = 999;
        this.changeDirection();
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Projectile) {
            this.health -= 0.1;
            this.healthBar.reduceHealth(0.1);
            this.graphics.use(this.animationHurt);
            console.log(this.health)
            if (this.health <= 0) {
                this.graphics.use(this.animationDeath);
                this.currentAnimation = this.animationDeath
                this.healthBar.kill();
                this.collisionType = CollisionType.Passive
            }
        }
    }

    changeDirection() {
        if (this.health > 0) {
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
    }

    updateAnimation() {
        if (this.health > 0) {
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
    }

    onPreUpdate(engine, delta) {
        if (this.health > 0) {
            let playerFound = false;
            let playerPosition = 0; // Initialize player position

            engine.currentScene.actors.forEach(actor => {
                if (actor instanceof Player) {
                    playerFound = true;
                    const distanceToPlayer = this.pos.distance(actor.pos);
                    if (distanceToPlayer <= this.detectionRadius) {
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

}