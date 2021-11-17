interface Product {
  id : number;
  name : string;
  price : number;
  brand : string;
  stock : number;
}

// 상품 목록 받아오기 위한 API 기본함수 타입형태 ex) Product 프로미스를 배열로 받아온다고 가정했을땐 다음과 같은 모습이다.
// function fetchProducts():Promise<Product[]>{
// }

//! 1.Pick : Product interface 중 일부 상품정보만 보여주고 싶을때
//interface 를 한번 더 써주게 되면 중복이 된다. ->Pick 이라는 유틸리티를 사용!
// interface ShoppingItem {
//   id : number;
//   name : string;
//   price : number;
// }

// function displayProductDetail(shoppingItem:ShoppingItem){
// }
//!프리뷰도 볼 겸 인터페이스 또는 type 별칭으로 선언해주기, 여기서는 타입으로도 가능하다.
//불필요한 코드들이 줄어들고 깔끔하게 타입정의가 가능하다.
type ShoppingItem = Pick<Product,'id'|'name'|'price'>;
function displayProductDetail(shoppingItem:Pick<Product,'id'|'name'|'price'>){
}

//! 2. Omit : Pick 과는 반대되는 개념  : 특정 타입에서 안쓸것들을 빼고 나머지를 쓰겠다.
interface AddressBook {
  name : string;
  phone : number;
  address : string;
  company : string;
}
const phoneBook : Omit<AddressBook,'address'> = {
  name : '재택근무',
  phone : 123456789,
  company : '내 방'
}
const chingtao : Omit<AddressBook,'address' | 'company'>={
  name : 'pizza',
  phone : 61029394550
}

//!3.Partial : 상품의 정보를 업데이트(put 같은 역할)
// ? 로 옵셔널처리를 해서 선택적으로 적용이 가능하게 한다. -> Partial<Product>와 동일한 효과가 있다. 더 간단!
//기존에 있는 Product 라는 타입을 재활용할 수 있다. 

// interface UpdateProduct {
//   id? : number;
//   name? : string;
//   price? : number;
//   brand? : string;
//   stock? : number;
// }
type UpdateProduct = Partial<Product>
function updateProductItem(productItem:Partial<Product>){

}
//! 4.유틸리티 타입 구현하기 - partial

//밑의 주석처럼 인터페이스를 두번 선언하지 않아도 Partial 타입선언하므로서 재활용 가능한 사례
interface UserProfile {
  username : string,
  email : string,
  profilePhotoUrl : string
}
// interface UserProfileUpdate {
//   username? : string,
//   email? : string,
//   profilePhotoUrl? : string
// }
// 4-1UserProfile 그대로 인덱스로 접근하여 위에서 만든 인터페이스를 타입별칭으로 바꿔준것. 위와 동일한 인터페이스가 아닌, 타입별칭 생성.
// type UserProfileUpdate = {
//   username? : UserProfile['username'],
//   email? : UserProfile['email'],
//   profilePhotoUrl? : UserProfile['profilePhotoUrl']
// }
// !맵드(Mapped)타입 4-2 : 위와 동일한 값이지만 더 간단하게 사용해보기 배열안의 in 오퍼레이터를 사용해서 반복문을 돌리는 개념. 
// partial 과 같은 동작원리이지만 Partial 타입은 아님, 파셜타입을 줄여나가는 방식 중 하나.
// type UserProfileUpdate = {
//   [ p in 'username' | 'email' | 'profilePhotoUrl']? : UserProfile[p]
// }
// type UserProfileKeys = keyof UserProfile
// 4-3 Vs 에서 제공되는 타입스크립트 partial 설명(?) 과 제일 가까운 형태로 보여지게 된다.  
// type UserProfileUpdate = {
//   [ p in keyof UserProfile]? : UserProfile[p]
// }
//4-4 실제 최종 partial , 제네릭 사용 UserProfile를 T로 바꾸면 
type Subset<T> = {
  [ p in keyof T]? : T[p]
}
