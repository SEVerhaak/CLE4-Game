import {
    SpriteSheet,
    CollisionType, Animation, AnimationStrategy, Vector, range, Actor, Timer
} from "excalibur";
import {Resources} from "../resources.js";
import {Projectile} from "./projectile.js";
import {Man} from "../enemies/man.js";

export class FireProjectile3 extends Projectile {

    //sprite = this.graphics.use(Resources.Nectar.toSprite())
    damage = 0
    spriteSheet = SpriteSheet.fromImageSource({
        image: Resources.FireProjectile3,
        grid: {
            columns: 3,
            rows: 2,
            spriteWidth: 16,
            spriteHeight: 16
        },
    });
    animEndFrame = 5
    scaleModifier = 0.5
    animStrat = AnimationStrategy.Freeze
    delay = 50
    range = 1000
    speed = 0.5

    constructor(velocity, pos) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.vel = velocity.scale(new Vector(this.speed, this.speed))
        this.pos = pos
    }

    onPostKill(scene){
        console.log('cheese')
        const explosionActor = new Actor({width: 100, height: 100, collisionType: CollisionType.Passive, name: 'explosion'})
        explosionActor.graphics.add(Resources.NectarMedium.toSprite())
        explosionActor.pos = new Vector(this.pos.x, this.pos.y)

        const spriteSheetExplosion = SpriteSheet.fromImageSource({
            image: Resources.Explosion,
            grid: {
                columns: 40,
                rows: 1,
                spriteWidth: 64,
                spriteHeight: 64
            },
        })

        let animation = Animation.fromSpriteSheet(spriteSheetExplosion, range(0, 40), 5, AnimationStrategy.End);
        explosionActor.graphics.use(animation)
        explosionActor.z = 99
        explosionActor.on('collisionstart', (evt) => this.explosionDamage(evt));

        scene.add(explosionActor)

        animation.events.on('end', () => {
            explosionActor.kill();
        });

    }

    explosionDamage(evt){
        if (evt.other instanceof Man){
            evt.other.takeExplosionDamage()
        }
    }

}
