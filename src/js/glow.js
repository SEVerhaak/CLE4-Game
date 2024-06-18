import {Actor} from "excalibur"
import { Resources } from './resources.js'

export class Glow extends Actor {

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Glow.toSprite())
    }
}