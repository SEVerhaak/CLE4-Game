import { Actor, Animation, CollisionType, Engine, Keys, range, SpriteSheet, Vector } from "excalibur";
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "../player.js";
import { Healthbar } from "../UI/healthBar.js";
import { Projectile } from "../projectiles/projectile.js";
import { SuperNectarPickup } from "../pickups/supernectarpickup.js";

export class Enemy extends Actor {
    currentAnimation
    detectionRadius
    attackradius
    normalSpeed
    attackSpeed

    killedOther = false;
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
    supernectar

    constructor(scene, game) {
        super({
            width: 10, height: 10, collisionType: CollisionType.Active, z: 20
        });
        this.scale = new Vector(2, 2);
        this.direction = new Vector(0, 0);
        this.changeDirectionInterval = 2000;
        this.timeSinceLastChange = 0;
        this.scene = scene;
        this.game = game
    }

    onInitialize(engine) {
        this.healthBar = new Healthbar(this.game, true);
        this.addChild(this.healthBar);
        this.healthBar.pos = new Vector(-8, -17);
        this.healthBar.z = 999;
        this.changeDirection();
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
    }

    takeExplosionDamage(damage){
        this.health -= damage
        this.healthBar.reduceHealth(damage);
        this.graphics.use(this.animationHurt);
        this.damageTaken = true
        if (this.health <= 0.01) {
            this.killedEvent()
        }
    }

    killedEvent(){
        this.graphics.use(this.animationDeath);
        this.currentAnimation = this.animationDeath
        this.healthBar.kill();
        this.body.collisionType = CollisionType.PreventCollision
        this.supernectar = new SuperNectarPickup
        this.supernectar.pos = new Vector(-10, -10)
        this.supernectar.z = 999;
        this.addChild(this.supernectar);
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Projectile) {
            if (!evt.other.isExplosive) {
                this.health -= evt.other.damage;
                this.healthBar.reduceHealth(evt.other.damage);
                this.graphics.use(this.animationHurt);
                this.damageTaken = true
                if (this.health <= 0.01) {
                    this.killedEvent()
                }
                if (!evt.other.canPassThrough) {
                    evt.other.kill();
                }
            } else{
                this.takeExplosionDamage(0.10)
                evt.other.kill()
            }
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
            }
        }
    }

    onPreUpdate(engine, delta) {
        if (this.health > 0.01) {
            this.playerSeen = false;
            let playerPosition = 0; // Initialize player position
            engine.currentScene.actors.forEach(actor => {
                if (actor instanceof Player) {
                    this.playerSeen = true;
                    const distanceToPlayer = this.pos.distance(actor.pos);
                    if ((distanceToPlayer <= this.detectionRadius || this.damageTaken) && !this.killedOther) {
                        if (distanceToPlayer <= this.detectionRadius) {
                            this.damageTaken = false;
                        }
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
}