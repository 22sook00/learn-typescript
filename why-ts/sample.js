/*function sum(a,b){
  return a+b;
}
sum(10,'20'); 

let sumResult = sum(19,20);
sumResult.toLocaleString(); //자동완성이 안되서 불편함.ㅋㅎㅋㅎ 오 .. 타입스크립트 좋은데 ? 
*/
//ts 파일이아닌, js 파일에서도 타입스크립트처럼 처리할 수 있는방법 : @ts-check
//@ts-check

/**
 * 
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 * @returns 
 */

function sum(a,b){
  return a+b;
}
sum(10,'20')