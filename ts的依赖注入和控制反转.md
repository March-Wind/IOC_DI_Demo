# ts的依赖注入和控制反转

使用ts的依赖注入和控制反转，来实现代码解耦和解决循环引用class问题。

首先理解“依赖注入”和“控制反转”两个概念。

1.  **控制反转指的是将程序执行流程的控制权从程序员转移到框架**
    
2.  **依赖注入是一种具体的编码技巧，通过构造函数、函数参数等方式将依赖的类对象传递给类使用，提高了代码的扩展性和灵活性。**
    

ts实现依赖注入可以使用元数据来实现，用到的库就是reflect-metadata，可以获取constructor参数的元数据。，需要在tsconfig.jsom中设置

:::
**"emitDecoratorMetadata": true**
:::

    {
      "compilerOptions": {
        "outDir": "dist",
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true, 
        "emitDecoratorMetadata": true // 这里一定要写
     }
    }
    

现在来看一下怎么使用元数据，编译前：

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

编译后：

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

**可以看到\`\_\_metadata("design:paramtypes", \[b\_1.default\])\`为class Cat增加了元数据,执行代码console.log(args) ， 输出为\[Tail\]**

**下面是一个循环依赖的例子：**

    import B from './b'
    import Injectable from './injectable'
    
    // 必须有装饰器，ts才会生成生成元数据
    @Injectable()
    class A {
      constructor(private b: B) {
      }
      doSomething(){
        // @ts-ignore
        console.log('a do something')
        ;
      }
      doSomethingElse() {
        this.b.doSomethingElse();
      }
    }
    export default A;

    import A from './a'
    import Injectable from './injectable'
    
    @Injectable()
    class B {
      constructor(private a: A) {}
      
      doSomethingElse() {
        // @ts-ignore
        console.log('Doing something else');
      }
      doSomething(){
        this.a.doSomething();
      }
    }
    
    export default B;

    const Injectable = () => {
      return function (target: any) {
        
      }
    }
    
    export default Injectable

**在入口处实现依赖注入和解决循环依赖**

    import 'reflect-metadata';
    import A from './a';
    import B from './b'
    
    const map = new WeakMap();
    
    // 通过prototype来实例化A/B，先不执行constructor，避免constructor里的循环依赖
    const a = Object.create(A.prototype);
    const b = Object.create(B.prototype);
    // 设置类和实例对象的映射关系
    map.set(A, a);
    map.set(B, b);
    // 通过元数据，获取构造函数的入参
    const A_args = Reflect.getMetadata('design:paramtypes', A)
    const B_args = Reflect.getMetadata('design:paramtypes', B)
    debugger
    const realAArgs = A_args.map((itemClass, index) => {
      // 通过class找到实例对象
      return  map.get(itemClass);
    })
    // 最后带上实例对象作为参数，执行constructor
    a.constructor.apply(a, realAArgs)
    
    
    const realBArgs = B_args.map((itemClass, index) => {
      return map.get(itemClass);
    })
    b.constructor.apply(b, realBArgs)
    // 最后验证方法
    a.doSomethingElse()