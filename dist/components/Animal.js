"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
var pixi_js_1 = require("pixi.js");
var Animal = /** @class */ (function () {
    function Animal() {
        this._view = new pixi_js_1.Container();
        this._counted = false;
        var textures = [
            pixi_js_1.Texture.from('animal'),
            pixi_js_1.Texture.from('animal1'),
            pixi_js_1.Texture.from('animal2'),
            pixi_js_1.Texture.from('animal2'),
            pixi_js_1.Texture.from('animal2'),
            pixi_js_1.Texture.from('animal2'),
            pixi_js_1.Texture.from('animal1'),
            pixi_js_1.Texture.from('animal')
        ];
        this._animal = new pixi_js_1.AnimatedSprite(textures);
        this._animal.animationSpeed = 0.1;
        this._animal.anchor.set(0.5);
        this._animal.play();
        this._view.addChild(this._animal);
    }
    Object.defineProperty(Animal.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "x", {
        get: function () {
            return this._view.position.x;
        },
        set: function (value) {
            this._view.position.x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "y", {
        get: function () {
            return this._view.position.y;
        },
        set: function (value) {
            this._view.position.y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "counted", {
        get: function () {
            return this._counted;
        },
        set: function (value) {
            this._counted = value;
        },
        enumerable: false,
        configurable: true
    });
    return Animal;
}());
exports.Animal = Animal;
