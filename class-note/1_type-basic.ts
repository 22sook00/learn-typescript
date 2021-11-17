//기본적인 타입에 대해 알아보기.
//!ts 문자열 선언방식
let str:string = 'hello'
//!ts 숫자 선언방식
let num:number = 3
//!어레이는 첫글자는 대문자표시, <> 안에는 배열안의 값의 타입을작성, 배열은 두가지표기법이 있다.
let arr:Array<number> = [1,2,3];
let heroes:Array<string> = ['capt','thor','hulk',3]
let items : number[] = [1,2,3]

//!ts 튜플 : 배열에 특정 순서,인덱스에 타입까지 정하는것을 튜플이라고 한다.
let address:[string,number] = ['gangnam',10];

//!ts 객체
let obj:object = {};
/*let person : object = {
  name:'capt',
  age : 100
};*/
let person : {name:string,age:number} ={
  name:'thor',
  age:3000
}

//!ts 진위값 불리언값
let show:boolean = true;