"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
var pixi_js_1 = require("pixi.js");
var Hero = /** @class */ (function () {
    function Hero() {
        this._view = new pixi_js_1.Container();
        this._speed = { x: 0, y: 0 };
        var textures = [
            pixi_js_1.Texture.from('mainHero'),
            pixi_js_1.Texture.from('mainHero1'),
            pixi_js_1.Texture.from('mainHero2')
        ];
        this._mainHero = new pixi_js_1.AnimatedSprite(textures);
        this._mainHero.animationSpeed = 0.25;
        this._mainHero.anchor.set(0.5);
        this._mainHero.play();
        this._view.addChild(this._mainHero);
    }
    Object.defineProperty(Hero.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "x", {
        get: function () {
            return this._view.position.x;
        },
        set: function (value) {
            this._view.position.x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "y", {
        get: function () {
            return this._view.position.y;
        },
        set: function (value) {
            this._view.position.y = value;
        },
        enumerable: false,
        configurable: true
    });
    Hero.prototype.moveHero = function () {
        this._mainHero.play();
    };
    Hero.prototype.stopHero = function () {
        this._mainHero.stop();
    };
    return Hero;
}());
exports.Hero = Hero;
