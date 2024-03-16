import { Container, Text } from "pixi.js";

export class Scoreboard {
    private _view: Container;
    private _score: number;
    private _scoreText: Text;

    constructor(initialScore: number = 0) {
        this._view = new Container();
        this._score = initialScore;
        
        this._scoreText = new Text(`Score: ${this._score}`, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        });
        
        // this._scoreText.anchor.set(1);
        this._view.addChild(this._scoreText);

        // Position the scoreboard at the top center of the view
        this._view.x = window.innerWidth / 2;
        this._view.y = 30;
    }

    get view(): Container {
        return this._view;
    }

    // Updates the score displayed on the scoreboard
    updateScore(newScore: number): void {
        this._score = newScore;
        this._scoreText.text = `Score: ${this._score}`;
    }

    // Optional: Adjust the position of the scoreboard
    setPosition(x: number, y: number): void {
        this._view.x = x;
        this._view.y = y;
    }
}
