//interface란 ? 반복되는 타입에 대해서 하나의 인터페이로 정의하고 사용하게 한다.
//장점 : 오탈방지, 다른사람이 쓰기도 쉽다.상호간의 약속 .

interface User {
  age : number;
  name : string;
}
// 변수에 인터페이스 활용
let sook:User = {
  age:31,
  name : '숙영'
}

// 함수에 인터페이스(상호간의 약속) 활용 -> 활용도 높음.
function getUser(user:User){
  console.log(user);
}
const capt = {
  name : '캡틴',
  age : 100
}
getUser(capt);

interface SumFunction {
  //인자로 두개의 숫자를 받아서 최종적으로 숫자를 반환해준다고 정의.
  (a:number,b:number) : number;
}
let sum : SumFunction;
sum = function(a:number,b:number):number{
  return a+b;
};

//인덱싱
interface StringArr {
  [index:number] : string;
}
let arr:StringArr = ['a','b','c','d'];
arr[0] = '10' // 'a'

//딕셔너리 패턴 (인덱싱과 유사)
interface StringRegexDictionary {
  [key : string] : RegExp;
}
let obj:StringRegexDictionary = {
  //sth : /abc/,
  cssFile : /\.css$/,
  jsFile : /\.js$/,
}

Object.keys(obj).forEach((value)=>{});

//인터페이스 확장 : 기존에 있던거보다 더 확장해서 쓸수있는것
//중복되는 값들을 다른 인터페이스가 갖고있다면 상속을 받아서 확장해서 사용하는것. : extends
interface Person {
  name : string;
  age : number
}
interface Developer extends Person {
  language : string;
}

let sook2:Developer = {
  name : 'sookyoung',
  age : 30,
  language : 'korean'
} 
