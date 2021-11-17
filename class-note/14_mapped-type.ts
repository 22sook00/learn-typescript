// 기존에 존재하는 타입을 새로운 타입으로 변환해 내는것이 mapped 타입
// map 함수를 돌리는 느낌으로,

type Heroes = 'Hulk' | 'Capt' | 'Thor'
//각 string 을 key 로 받는 age값을 넘버로 받는 새로운 타입정의하기
//여기서의 in은 for in 반복문의 in 을 뜻함. -> 각각의 타입을 순회하여 접근한다는 의미
// K 는 타입변수라고 보면 됨.
type HeroAges = { [ K in Heroes] : number }

const ages: HeroAges = {
  Hulk : 33,
  Capt : 100,
  Thor : 1000
}

