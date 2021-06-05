const logOutBtn = document.querySelector("#logout");

logOutBtn.addEventListener("click", function () {
  fetch("http://localhost:8080/user/logout", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      logingOutFromQuizHub(data);
    })
    .catch((error) => unsuccessfulLogOutFromQuizHub(error));
});

const logingOutFromQuizHub = (data) => {
  console.log(data);
  window.location.replace("login.html");
};

const unsuccessfulLogOutFromQuizHub = (error) => {
  console.log(error);
  window.location.replace("home.html");
};

function loadHTMLTable(data, page) {
  const table = document.querySelector("#my-quizess-container");
  console.log(data);
  table.innerHTML = "";
  let tableData = ``;
  let index = 1;
  let idGenerator = 100;
  for (let quiz of data.mass_quizess) {
    var tableHTML = `<div class="my-quizess-area"> <div > <h2 style="height:auto;word-wrap: break-word;" id="to-update-question"> ${index}. ${quiz.question}</h2></div> <div class="options-area">`;
    let option1 = ``;
    for (let option of quiz.options) {
      option1 += `<label class="option" id="${idGenerator}"> ->${option.option}</label><br>`;
      idGenerator++;
    }
    tableHTML += option1;
    tableHTML += `<h3 style="margin-top: 15px; margin-left:35px;" id="to-update-answer"> Answer : ${quiz.answer} </h3>`;
    tableHTML += `<h4 style="margin-top: 7px; margin-left:35px;" id="to-update-quiztag"> Catagory : ${quiz.tag} </h4>`;
    if (page === "profile") {
      tableHTML += `<h3  style="margin-top: 0px; margin-left:90%; "> <i quiz_id=${quiz._id} quiz_index="${index}" style="cursor:pointer" class="fas fa-edit edit"></i> </h3>`;
      tableHTML += `<h3 style="margin-top: 8px; margin-left:90%; cursor:pointer";> <i quiz_id=${quiz._id}  class="fas fa-trash delete"></i> </h3>`;
    }
    tableHTML += ` </div>
        </div>`;

    tableData += tableHTML;
    index++;
  }
  table.innerHTML += tableData;
}

const activeTagBtn = (btn) => {
  const physicsBtn = document.querySelector("#physics");
  const csBtn = document.querySelector("#cs");
  const gi = document.querySelector("#gi");
  const other = document.querySelector("#other");

  if (
    btn.id === "h3p" ||
    btn.id === "h3c" ||
    btn.id === "h3g" ||
    btn.id === "h3o"
  ) {
    physicsBtn.style.backgroundColor = "#0deb99";
    csBtn.style.backgroundColor = "#0deb99";
    gi.style.backgroundColor = "#0deb99";
    other.style.backgroundColor = "#0deb99";

    btn.parentNode.style.backgroundColor = "#0a8256";
  } else {
    physicsBtn.style.backgroundColor = "#0deb99";
    csBtn.style.backgroundColor = "#0deb99";
    gi.style.backgroundColor = "#0deb99";
    other.style.backgroundColor = "#0deb99";

    btn.style.backgroundColor = "#0a8256";
  }
};

function quizTestParser(catagory, skip) {
  console.log(catagory);
  let tag = catagory;
  fetch(`http://localhost:8080/quiz/test/${tag}?skip=${skip}&limit=1`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data = data.mass_quizess.docs[0];
      quizTestHtmlLoader(data, skip);
    })
    .catch((error) => {
      notifier(error);
    });

  function quizTestHtmlLoader(data, skip) {
    const quizTestArea = document.querySelector("#quiz-test-container");
    let optionsHtmlArea = ``;

    for (let option of data.options) {
      let optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                           <label class="option" for="${option.option}">${option.option}</label><br />`;
      optionsHtmlArea += optionHtml;
    }
    answer = data.answer;

    let testHtml = `<div style="position:relative" class="quiz-container-test-area" id="quiz_id">
                    <div class="test-quiz-area">
                      <div class="question-area">
                        <h3 id="quiz_id_for_answer_submission"  quiz_id="${data._id}" >
                        ${data.question}
                        </h3>
                      </div>
                      <div class="options-area" style="margin-top:30px">
                        ${optionsHtmlArea}
                      </div>
                    </div>
                    <div class="quiz-container-btn-area" style="grid-gap: 20px;position:absolute;bottom:20px;left:8px;margin-top:18px;">
                      <div id="prev-question">
                        <h3 >PREV</h3>
                      </div>
                      <div id="ans-submit">
                        <h3 >SUBMIT</h3>
                      </div>
                      
                      <div id="next-question">
                        <h3>NEXT</h3>
                      </div>
                    </div>
                    </div> `;

    quizTestArea.innerHTML = testHtml;
    const notification = document.querySelector("#notification");
    notification.innerText = "Physics Quiz Test";

    document
      .querySelector("#next-question")
      .addEventListener("click", function (e) {
        nextQuizParser(e, (skip = skip + 1));
      });

    document
      .querySelector("#prev-question")
      .addEventListener("click", function (e) {
        nextQuizParser(e, (skip = skip - 1));
      });

    document
      .querySelector("#ans-submit")
      .addEventListener("click", function (e) {
        answerSubmit(answer);
      });
  }

  function nextQuizParser(e, skip) {
    quizTestParser(tag, skip);
  }

  function notifier(error) {
    const notification = document.querySelector("#notification");
    notification.innerText = "We got no more quiz for you";
  }

  function answerSubmit(answer) {
    var getSelectedValue = document.querySelector(
      'input[name="options"]:checked'
    );
    if (getSelectedValue === null) {
      console.log("not selected");
    } else if (getSelectedValue.value === answer) {
      updateUserProfileForCorrectAnswer();
    } else {
      console.log("Wrong selection", getSelectedValue, "answer", answer);
    }
  }

  function updateUserProfileForCorrectAnswer() {
    const quiz_id_element_for_answer_submission = document.querySelector(
      "#quiz_id_for_answer_submission"
    );
    const quiz_id =
      quiz_id_element_for_answer_submission.getAttribute("quiz_id");

    arrayOfCorrectAnswersIds.push({
      quizids: quiz_id,
    });

    fetch(`http://localhost:8080/user/profile/${tag}/correct-ans`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        loggedInUser_id: loggedInUser_id,
        noOfCorrectAnswers: noOfCorrectAnswers,
        arrayOfCorrectAnswersIds: arrayOfCorrectAnswersIds,
      }),
    })
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        }
        throw new Error("wrong status code");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
