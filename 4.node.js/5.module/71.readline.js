const readdirSync = require("readline-sync");

//윈도우 테미널에서 한글깾니느 문제.. 인코딩 이슈
//chcp 65001
const answer1 = readdirSync.question("첫번째 숫자를 입력하시오: ");
console.log(`첫번째 숫자는 ${answer1}입니다.`);

const answer2 = readdirSync.question(`두번째 숫자를 입력하시오: `);
console.log(`두번째 수자는 ${answer2}입니다.}`);