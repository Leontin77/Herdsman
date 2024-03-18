"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = void 0;
var pixi_js_1 = require("pixi.js");
var Scoreboard = /** @class */ (function () {
    function Scoreboard(initialScore) {
        if (initialScore === void 0) { initialScore = 0; }
        this._view = new pixi_js_1.Container();
        this._score = initialScore;
        this._scoreText = new pixi_js_1.Text("Score: ".concat(this._score), {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        });
        this._view.addChild(this._scoreText);
        this._view.x = window.innerWidth / 2;
        this._view.y = 30;
    }
    Object.defineProperty(Scoreboard.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: false,
        configurable: true
    });
    Scoreboard.prototype.updateScore = function (newScore) {
        this._score = newScore;
        this._scoreText.text = "Score: ".concat(this._score);
    };
    Scoreboard.prototype.setPosition = function (x, y) {
        this._view.x = x;
        this._view.y = y;
    };
    return Scoreboard;
}());
exports.Scoreboard = Scoreboard;
