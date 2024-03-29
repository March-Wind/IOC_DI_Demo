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
require("reflect-metadata");
var Injectable = function () {
    return function (target) {
    };
};
var Tail = /** @class */ (function () {
    function Tail() {
    }
    return Tail;
}());
// 移除参数
var Cat = /** @class */ (function () {
    function Cat(tail) {
        this.tail = tail;
    }
    Cat = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Tail])
    ], Cat);
    return Cat;
}());
var instantiateCat = function () {
    var args = Reflect.getMetadata('design:paramtypes', Cat);
    // @ts-ignore
    console.log(args); // 输出为[Tail]
};
instantiateCat();
// import 'reflect-metadata';
// import A from './a';
// import B from './b'
// const map = new WeakMap();
// // 通过prototype来实例化A/B，先不执行constructor，避免constructor里的循环依赖
// const a = Object.create(A.prototype);
// const b = Object.create(B.prototype);
// // 设置类和实例对象的映射关系
// map.set(A, a);
// map.set(B, b);
// // 通过元数据，获取构造函数的入参
// const A_args = Reflect.getMetadata('design:paramtypes', A)
// const B_args = Reflect.getMetadata('design:paramtypes', B)
// debugger
// const realAArgs = A_args.map((itemClass, index) => {
//   // 通过class找到实例对象
//   return  map.get(itemClass);
// })
// // 最后带上实例对象作为参数，执行constructor
// a.constructor.apply(a, realAArgs)
// const realBArgs = B_args.map((itemClass, index) => {
//   return map.get(itemClass);
// })
// b.constructor.apply(b, realBArgs)
// // 最后验证方法
// a.doSomethingElse()
