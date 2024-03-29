


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




// 查看typescript添加元数据的demo
// import 'reflect-metadata'

// const Injectable = () => {
//   return function (target: any) {
//   }
// }

// class Tail {}

// // 移除参数
// @Injectable()
// class Cat {
//   constructor (
//     private readonly tail: Tail,
//   ) {}
// }

// const instantiateCat = () => {
//   const args = Reflect.getMetadata('design:paramtypes', Cat)
//   // @ts-ignore
//   console.log(args) // 输出为[Tail]
// }

// instantiateCat()