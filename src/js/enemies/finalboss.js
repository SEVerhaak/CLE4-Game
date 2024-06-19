import { Actor, Animation, AnimationStrategy, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { Player } from "../player.js";
import { Healthbar } from "../UI/healthBar.js";
import { Projectile } from "../projectiles/projectile.js";

export class Finalboss extends Actor {
    currentAnimation = null;
    detectionRadius = 5000; // Radius to detect the player
    attackradius = 30;
    normalSpeed = 80; // Normal movement speed
    attackSpeed = 80; // Movement speed when attacking

    playerSeen
    damageTaken = false;

    animationDeath
    animationRight
    animationLeft
    animationAttack
    animationHurt
    healthBar
    health = 1;
    scene
    game

    constructor(scene, game) {
        super({
            width: 5, height: 5, collisionType: CollisionType.Active, z: 20
        });
        this.scale = new Vector(1.5, 1.5);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
        this.scene = scene;
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.collider.useBoxCollider(
            25, 10, new Vector(0, 0), new Vector(-10, -5)
        )
       

       

        // Define the sprite sheet
        const SpriteSheetFinalboss = SpriteSheet.fromImageSource({
            image: Resources.Finalboss,
            grid: {
                rows: 10,
                columns: 6,
                spriteWidth: 32,
                spriteHeight: 32
            },

        })

        // Load movement animations
        this.animationRight = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(24, 29), 100);
        this.animationLeft = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(24, 29), 100);
        this.animationTop = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(18, 23), 100);
        this.animationIdle = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(18, 18), 100);
        this.animationDown = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(30, 35), 100);
        this.animationLeft.flipHorizontal = true;
        this.animationAttack = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(36, 39), 100);
        this.animationDeath = Animation.fromSpriteSheet(SpriteSheetFinalboss, range(54, 57), 100, AnimationStrategy.Freeze);

        // Default start animation
        this.graphics.use(this.animationRight);
        this.currentAnimation = this.animationRight;
        this.healthBar = new Healthbar(this.game, true);
        this.addChild(this.healthBar);
        this.healthBar.pos = new Vector(-8, -17);
        this.healthBar.z = 999;
        this.changeDirection();
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Projectile) {
            this.health -= evt.other.damage/3;
            this.healthBar.reduceHealth(evt.other.damage/3);
            this.graphics.use(this.animationHurt);
            this.damageTaken = true
            console.log(this.health)
            if (this.health <= 0.01) {
                this.graphics.use(this.animationDeath);
                this.currentAnimation = this.animationDeath
                this.healthBar.kill();
                this.body.collisionType = CollisionType.PreventCollision
                this.TimerGameover(evt.other)
            }
            evt.other.kill();
        }
    }

    changeDirection() {
        if (this.health > 0.01) {
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
        if (this.health > 0.01) {
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
            } else if (this.direction.equals(new Vector(0, 1))) {
                if (this.currentAnimation !== this.animationTop) {
                    this.graphics.use(this.animationTop);
                    this.currentAnimation = this.animationTop;
                }
            } else if (this.direction.equals(new Vector(0, -1))) {
                if (this.currentAnimation !== this.animationDown) {
                    this.graphics.use(this.animationDown);
                    this.currentAnimation = this.animationDown;
                }
            } else if (this.direction.equals(new Vector(0, 0))) {
                if (this.currentAnimation !== this.animationIdle) {
                    this.graphics.use(this.animationIdle);
                    this.currentAnimation = this.animationIdle;
                }
            }
        }
    }

    onPreUpdate(engine, delta) {
        if (this.health > 0.01) {
            this.playerSeen = false;
            let playerPositionx = 0; // Initialize player position
            let playerPositiony = 0;
            engine.currentScene.actors.forEach(actor => {
                if (actor instanceof Player) {
                    this.playerSeen = true;
                    const distanceToPlayer = this.pos.distance(actor.pos);
                    if (distanceToPlayer <= this.detectionRadius || this.damageTaken) {
                        if (distanceToPlayer <= this.detectionRadius) {
                            this.damageTaken = false;
                        }
                        this.direction = actor.pos.sub(this.pos).normalize();
                        playerPositionx = actor.pos.x - this.pos.x; // Calculate player position relative to the bat
                        playerPositiony = actor.pos.y - this.pos.y; // Calculate player position relative to the bat
                        this.animationAttack.flipHorizontal = !(playerPositionx > 0);
                        if (playerPositionx < 0 && playerPositionx < playerPositiony) {
                            this.graphics.use(this.animationLeft)
                            this.currentAnimation = this.animationLeft
                        } else if (playerPositionx > 0 && playerPositionx > playerPositiony) {
                            this.graphics.use(this.animationRight)
                            this.currentAnimation = this.animationRight
                        } if (playerPositiony < 0 && playerPositiony < playerPositionx) {
                            this.graphics.use(this.animationDown)
                            this.currentAnimation = this.animationDown
                        } else if (playerPositiony > 0 && playerPositiony > playerPositionx) {
                            this.graphics.use(this.animationTop)
                            this.currentAnimation = this.animationTop
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

            if (!this.playerSeen) {
                this.timeSinceLastChange += delta;
                if (this.timeSinceLastChange >= this.changeDirectionInterval) {
                    this.changeDirection();
                    this.timeSinceLastChange = 0;
                }
                this.vel = this.direction.scale(this.normalSpeed);
            }
        } else {
            this.vel = new Vector(0, 0);
            this.body.collisionType = CollisionType.PreventCollision
        }
    }


    TimerGameover(enemy) {
        console.log('timer')
        setTimeout(() => {
            enemy.killedOther = false;
            this.body.collisionType = CollisionType.Active
            this.game.goToEndscene(); 
        }, 1000)
    }


}


