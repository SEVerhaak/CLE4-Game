import {
    Actor,
    Engine,
    Vector,
    SpriteSheet,
    Animation,
    range,
    AnimationStrategy,
    CollisionType
} from "excalibur";
import {Resources} from "./resources.js";

export class Projectile extends Actor {
    x
    y
    constructor(x,y) {
        super({ width: 8, height: 8, collisionType: CollisionType.PreventCollision});
        this.x = x;
        this.y = y;
    }

    onInitialize(engine) {
        console.log('new bubbles added');
        this.pos.y = this.y;
        this.pos.x = this.x;
        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.BubbleAnim, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 10,
                rows: 1,
                spriteWidth: 8,
                spriteHeight: 8
            },
        });
        this.z = 3;
        this.scale = new Vector(1,1);
        this.Animation = Animation.fromSpriteSheet(spriteSheet, range(0, 9), 100, AnimationStrategy.End);
        this.graphics.use(this.Animation);

    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        if (this.Animation.done){
            //this.kill()
            console.log('killed anim')
        }
    }
}
