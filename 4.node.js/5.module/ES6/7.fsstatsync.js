const fs = require("fs");

const directoryPath = "./"; //현재 디렉토리

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("디렉토리 읽기 오류");
    return;
  }
  files.forEach((file) => {
    //비동기 처리 함수인데, 동기처리 함수로 바꿔보기
    try {
      const stat = fs.statSync(file);
      if (stats.isDirectory()) {
        console.log(`이 파일 ${file}은 디렉토리 입니다.`);
      }
      if (stats.isFile()) {
        console.log(`이 파일 ${file}은 파일 입니다.`);
      }
    } catch (error) {
      console.log("파일 stat오류");
    }
  });
});
