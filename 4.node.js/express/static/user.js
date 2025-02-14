document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");

  updateUsers();
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = username.value;
    if (!name) {
      alert("이름을 입력하세요");
      return;
    }

    registerUser(name);
  });
});

function registerUser(name) {
  fetch("/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((response) => {
      if (response.ok) {
        alert("등록 성공");
        username.value = "";
        updateUsers();
      } else {
        alert("등록 실패");
      }
    })
    .catch((error) => {
      alert("등록 중에 오류가 발생했습니다.", error.message);
    });
}

function updateUsers() {
  const userTable = document.getElementById("userTable");
  userTable.innerHTML = ``;

  // GET /user
  fetch("/user")
    .then((response) => response.json())
    .then((users) => {
      if (Object.keys(users).length === 0) {
        const row = document.createElement("div");
        row.textContent = "등록된 사용자가 없습니다.";
        userTable.appendChild(row);
      } else {
        for (const key in users) {
          const row = document.createElement("div");
          row.innerText = `ID: ${key}, Name: ${users[key]}`;

          const modifyButton = document.createElement("button");
          modifyButton.textContent = "수정";
          modifyButton.addEventListener("click", () => {
            modifyUsers(key);
          });
          row.appendChild(modifyButton);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.addEventListener("click", () => {
            deleteUsers(key);
          });
          row.appendChild(deleteButton);

          userTable.appendChild(row);
        }
      }
    });
}

function deleteUsers(userId) {
  fetch(`/user/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // alert("삭제 성공");
        updateUsers();
      } else {
        alert("삭제 실패");
      }
    })
    .catch((error) => {
      console.error("삭제 중 오류?", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    });
}

function modifyUsers(userId) {
  const newName = prompt("수정할 이름을 입력하세요.");
  if(newName !== null){
    fetch(`/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: JSON.stringify({name:newName}),
    })
  .then(response => {
      if (response.ok) {
        alert("수정 성공");
        updateUsers();//화면갱신
      } else {
        alert("수정 실패");
      }
    })
    .catch((error) => {
      console.error("수정 중 오류 발생", error);
      alert("수정 중 오류가 발생했습니다.");
    });
}
