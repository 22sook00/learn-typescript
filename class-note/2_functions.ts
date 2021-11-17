// 함수의 파라미터에 타입을 정의하는 방식
function sum(a:number,b:number){
  return a+b;
}
sum(1,2)

// 함수의 반환 값에 타입을 정의하는 방식
function add() : number{
  return 10;
}

//함수에 타입을 정의하는 방식 : js 와 다르게 유연하지않고 명확하다.
//파라미터의 갯수, 타입에 맞게 쓰지않으면 오류가 난다.
function sum2(a:number,b:number):number{
  return a+b;
}
sum2(1,2,3,4,5); //3;

//함수의 옵셔널 파라미터(선택적) -> ? 선택적으로 쓰거나말거나 선택.
function log(a:string,b:string,c?:string){
  
}
log('hello wolrd');
log('hello ts','abc');