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
        
        this._view.addChild(this._scoreText);

        this._view.x = window.innerWidth / 2;
        this._view.y = 30;
    }

    get view(): Container {
        return this._view;
    }

    updateScore(newScore: number): void {
        this._score = newScore;
        this._scoreText.text = `Score: ${this._score}`;
    }

    setPosition(x: number, y: number): void {
        this._view.x = x;
        this._view.y = y;
    }
}
