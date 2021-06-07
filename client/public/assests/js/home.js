document.addEventListener("DOMContentLoaded", auth());

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/users/profile/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      tableHtmlParser(data);
    })
    .catch((error) => console.log(error));
});

function tableHtmlParser(data) {
  let users = data.users;
  let tableData = `<table>
                      <tr>
                        <th>Username</th>
                        <th>Physics Score</th>
                        <th>CS score</th>
                        <th>GI score</th>
                        <th>Other score</th>
                      </tr>`;

  for (let user of users) {
    let phydiff = user.correctAnswerInPhysics - user.wrongAnswerInPhysics;
    let csdiff = user.correctAnswerInCS - user.wrongAnswerInCS;
    let gidiff = user.correctAnswerInGI - user.wrongAnswerInGI;
    let otherdiff = user.correctAnswerInOther - user.wrongAnsweredInOther;
    let userData = `<tr class="adding-neumorphism">
                      <td>${user.username}</td>
                      <td>${phydiff}</td>
                      <td>${csdiff}</td>
                      <td>${gidiff}</td>
                      <td>${otherdiff}</td>
                    </tr>`;
    tableData += userData;
  }
  tableData += `</table>`;
  const tableDataArea = document.querySelector("#table-data-area");
  tableDataArea.innerHTML = tableData;
}
