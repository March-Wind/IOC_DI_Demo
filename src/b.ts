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