## 코로나 세계 현황판 만들기

최종 프로젝트 폴더입니다

## 자바스크립트 프로젝트에 타입스크립트 적용하기
0. JSDoc 으로 타입 시스템 입히기
1. 타입스크립트 기본환경 구성
  - [x] npm 초기화 명령어로 package.json 파일 생성 (npm init)
  - [x] 타입스크립트 라이브러리 설치 
  npm i typescript --save-dev = npm i typescript -D
  - [x] 타입스크립트 설정파일(tsconfig.json) 생성 및 기본 값 추가
  - [x] 자바스크립트 파일을 타입스크립트 파일로 변환
  - [x] ts 컴파일 명령어인 `tsc` 로 타입스크립트 파일을 js 파일로 변환 (npm run build)
  
* 기존 프레임워크/라이브러 같이 프론트엔드 빌드시스템이 구축되있는 경우
 더 복잡해질수 있으므로 새로 프로젝트 아예 만들어서 기본환경을 만들어 진행 후 기존의 소스코드만 하나씩 입히는 방법을 추천한다.

* 엄격하지 않은 타입환경(loose type) 에서 프로젝트 돌려보기
  - 프로젝트에 테스트코드가 있다면 테스트코드가 통과하는지 반드시 먼저 확인.
  - 프로젝트의 js 파일을 모두 ts 파일로 변경 (중요한 파일 first)
  - ts 컴파일에러 나는것 위주로 먼저 수정 (사소한 기능이라도 변경하지 않도록 한다.)
  - 변경 후에도 테스트 코드가 성공하는지 확인.

2. 명시적인 `any` 선언하기

- `tsconfig.json` 파일에 `noImplicitAny` 값을 `true` 로 추가
  

## 참고 자료

- [존스 홉킨스 코로나 현황](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)
- [Postman API](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#27454960-ea1c-4b91-a0b6-0468bb4e6712)
- [Type Vue without Typescript](https://blog.usejournal.com/type-vue-without-typescript-b2b49210f0b)

## dependencies vs devDependencies
- dependencies : application logic 에 직접적으로 관여하는 (React,vue,jquery,chart library)
- devDependencies : 개발할때만 사용하는 (eslint, prettier, babel, typescript) 도구들이 해당. 
(배포할때 포함되지 않는라이브러리)
* 최종 빌드는 dependencies에 있는 내용만 배포하면된다. 