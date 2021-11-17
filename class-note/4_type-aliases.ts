//type 별칭
interface Iam {
name : string;
age : number;
}

type Iam = {
  name : string;
  age : number;
}

let sook0 : Iam = {
  name : '이숙영',
  age : 30
}

type MyString = string;
let str:MyString = 'hello'

// type 별칭과 interface 의 차이점은 무엇인가 ? 
// 타입별칭 : 정해진 타입에 대해 나중에 쉽게 참고할 수 있게 이름을 부여하는것과 같다.
// 가장 큰차이점 : 타입은 확장이 되지 않는다. (인터페이스는 extends 로 확장이 가능했다. 가급적이면 인터페이스 사용하는게 낫다.)
