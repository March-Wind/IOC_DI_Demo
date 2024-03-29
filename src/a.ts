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