"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var injectable_1 = require("./injectable");
// 必须有装饰器，ts才会生成生成元数据
var A = /** @class */ (function () {
    function A(b) {
        this.b = b;
    }
    A.prototype.doSomething = function () {
        // @ts-ignore
        console.log('a do something');
    };
    A.prototype.doSomethingElse = function () {
        this.b.doSomethingElse();
    };
    A = __decorate([
        (0, injectable_1.default)(),
        __metadata("design:paramtypes", [b_1.default])
    ], A);
    return A;
}());
exports.default = A;
