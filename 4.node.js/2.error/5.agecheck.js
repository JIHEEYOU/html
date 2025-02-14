//이 함수
//직접 필요한 곳에 try-catch를 통해서 오류 해결하기
function checkAge(age) {
  if (age < 0 || age > 150) {
    throw new Error("유효하지 않은 나이입니다.");
  }
  return `나이는 ${age} 입니다.`;
}

console.log(checkAge(10));
console.log(checkAge(55));
console.log(checkAge(99));
try {
  console.log(checkAge(-1));
} catch (error) {
  console.log("오류발생: ", error.message);
}
