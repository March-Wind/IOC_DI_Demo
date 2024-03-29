# typescript通过依赖注入和控制反转来解决class解耦和循环引用class问题

1. 控制反转指的是将程序执行流程的控制权从程序员转移到框架
2. 依赖注入是一种具体的编码技巧，通过构造函数、函数参数等方式将依赖的类对象传递给类使用，提高了代码的扩展性和灵活性。
3. 设置`tsconfig.json`的`emitDecoratorMetadata`为true, 为true时，class有装饰时，会给class加上ts的类型作为元数据，在后续可以获取元数据来把对应的实例注入
`编译前：`
```
import 'reflect-metadata'

const Injectable = () => {
  return function (target: any) {
  }
}

class Tail {}

// 移除参数
@Injectable()
class Cat {
  constructor (
    private readonly tail: Tail,
  ) {}
}

const instantiateCat = () => {
  const args = Reflect.getMetadata('design:paramtypes', Cat)
  // @ts-ignore
  console.log(args) // 输出为[Tail]
}

instantiateCat()
```

`编译后：`

```
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

```

可以看到`__metadata("design:paramtypes", [b_1.default])`为class Cat增加了元数据