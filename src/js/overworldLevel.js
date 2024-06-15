import { BoundingBox, Scene, Vector } from "excalibur"
import { Player } from "./player.js";
import { Resources } from "./resources.js";
import { EnterLevel } from "./enterlevel.js";

export class OverworldLevel extends Scene {

    player
    game

    constructor(game) {
        super();
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.player = new Player();
        this.player.pos = new Vector(1050, 1005);
        this.add(this.player);
        Resources.MainScene.addToScene(this);


        this.enterlevel1 = new EnterLevel(2062.41, 454.38, this.game,1);
        this.add(this.enterlevel1);

        this.enterlevel2 = new EnterLevel(1940.36, 2178.05, this.game,2);
        this.add(this.enterlevel2);

        this.enterlevel3 = new EnterLevel(342.23, 1958.72, this.game,3);
        this.add(this.enterlevel3);

        this.enterlevel4 = new EnterLevel(379.94, 761.01, this.game,4);
        this.add(this.enterlevel4);

        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 2365, 2373)); // Set the game bounds
        engine.currentScene.camera.zoom = 4;
    }
}