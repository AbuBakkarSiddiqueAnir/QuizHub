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

async function quizTestParser(catagory, skip) {
  let k, m, c, d, e, f, g, h;

  try {
    var notAllowedAnswer = await fetch("http://localhost:8080/user/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let notAllowedCorrectAns = data.c_answeredQuizIds;
        let notAllowedWrongAns = data.w_answeredQuizIds;

        k = data.correctAnswerInPhysics;
        m = data.wrongAnswerInPhysics;
        c = data.correctAnswerInCS;
        d = data.wrongAnswerInCS;
        e = data.correctAnswerInGI;
        f = data.wrongAnswerInGI;
        g = data.correctAnswerInOther;
        h = data.wrongAnsweredInOther;

        return [notAllowedCorrectAns, notAllowedWrongAns];
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }

  function notAllowedAnswerObjMaker() {
    let a = [];
    for (let obj of notAllowedAnswer) {
      for (let objchild1 of obj) {
        a.push({
          quiz_id: objchild1.quizids,
          my_answer: objchild1.my_answer,
        });
      }
    }
    return [...new Set(a)];
  }
  
  var notAllowedAnswerObjMakerData = notAllowedAnswerObjMaker();

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
      console.log(data);
      quizTestHtmlLoader(data, skip);
    })
    .catch((error) => {
      console.log(error);
      notifier(error, skip);
    });

  function quizTestHtmlLoader(data, skip) {
    const quizTestArea = document.querySelector("#quiz-test-container");
    let optionsHtmlArea = ``;

    for (let option of data.options) {
      optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                          <label  class="option" for="${option.option}">${option.option}</label><br />`;
      optionsHtmlArea += optionHtml;
    }

    let submitBtnChecker = `<div id="ans-submit">
                              <h3 >SUBMIT</h3>
                            </div>`;

    for (let a of notAllowedAnswerObjMakerData) {
      if (data._id === a.quiz_id) {
        submitBtnChecker = "";
        optionsHtmlArea = ``;
        for (let option of data.options) {
          if (option.option === a.my_answer) {
            optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                                <label style="color:red" class="option" for="${option.option}">${option.option}</label><br />`;
            optionsHtmlArea += optionHtml;
          } else if (option.option === data.answer) {
            optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                                <label style="color:green" class="option" for="${option.option}">${option.option}</label><br />`;
            optionsHtmlArea += optionHtml;
          } else {
            optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                                <label class="option" for="${option.option}">${option.option}</label><br />`;
            optionsHtmlArea += optionHtml;
          }
        }
      }
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
                      
                      ${submitBtnChecker}
                      <div id="next-question">
                        <h3>NEXT</h3>
                      </div>
                    </div>
                    </div> `;

    quizTestArea.innerHTML = testHtml;
    const notification = document.querySelector("#notification");

    notification.innerText = "Testify your disgusting brain";

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

  function notifier(error, skip) {
    const notification = document.querySelector("#notification");
    notification.innerText = "We got no more quiz for you";
    if (skip < 1) {
      notification.innerHTML = "No quizess at prev<span>&#128512</span>";
    }
  }

  function answerSubmit(answer) {
    var getSelectedValue = document.querySelector(
      'input[name="options"]:checked'
    );
    if (getSelectedValue === null) {
      nullAnsNotifier();
    } else if (getSelectedValue.value === answer) {
      correntAnsNotifier();
      updateUserProfileForCorrectOrWrongAnswer("correct-ans");
    } else if (getSelectedValue.value !== answer) {
      myanswerOnQuiz = getSelectedValue.value;
      wrongAnsNotifier();
      updateUserProfileForCorrectOrWrongAnswer("wrong-ans", myanswerOnQuiz);
    }
  }

  function correntAnsNotifier() {
    const notification = document.querySelector("#notification");
    notification.innerText = "Your answer is correct";
  }

  function wrongAnsNotifier() {
    const notification = document.querySelector("#notification");
    notification.innerText = "Your answer is incorrect";
    console.log(document.querySelector("#ans-submit"));
    document
      .querySelector("#ans-submit")
      .removeEventListener("click", function (e) {
        answerSubmit(answer);
      });
  }

  function nullAnsNotifier() {
    const notification = document.querySelector("#notification");
    notification.innerText = "Select option before submitting";
  }

  function updateUserProfileForCorrectOrWrongAnswer(path, myanswerOnQuiz) {
    const quiz_id_element_for_answer_submission = document.querySelector(
      "#quiz_id_for_answer_submission"
    );
    const quiz_id =
      quiz_id_element_for_answer_submission.getAttribute("quiz_id");

    let a, b;

    if (tag === "physics" && path === "correct-ans") {
      arrayOfCorrectAnswersIds.push({
        quizids: quiz_id,
      });
      a = k + 1;
      b = arrayOfCorrectAnswersIds;
    } else if (tag === "physics" && path === "wrong-ans") {
      arrayOfWrongAnswersIds.push({
        quizids: quiz_id,
        my_answer: myanswerOnQuiz,
      });
      a = m + 1;
      b = arrayOfWrongAnswersIds;
    } else if (tag === "cs" && path === "correct-ans") {
      arrayOfCorrectAnswersIds.push({
        quizids: quiz_id,
      });
      a = c + 1;
      b = arrayOfCorrectAnswersIds;
    } else if (tag === "cs" && path === "wrong-ans") {
      arrayOfWrongAnswersIds.push({
        quizids: quiz_id,
        my_answer: myanswerOnQuiz,
      });

      a = d + 1;
      b = arrayOfWrongAnswersIds;
    } else if (tag === "gi" && path === "correct-ans") {
      arrayOfCorrectAnswersIds.push({
        quizids: quiz_id,
      });
      a = e + 1;
      b = arrayOfCorrectAnswersIds;
    } else if (tag === "gi" && path === "wrong-ans") {
      arrayOfWrongAnswersIds.push({
        quizids: quiz_id,
        my_answer: myanswerOnQuiz,
      });

      a = f + 1;
      b = arrayOfWrongAnswersIds;
    } else if (tag === "other" && path === "correct-ans") {
      arrayOfCorrectAnswersIds.push({
        quizids: quiz_id,
      });

      a = g + 1;
      b = arrayOfCorrectAnswersIds;
    } else if (tag === "other" && path === "wrong-ans") {
      arrayOfWrongAnswersIds.push({
        quizids: quiz_id,
        my_answer: myanswerOnQuiz,
      });

      a = h + 1;
      b = arrayOfWrongAnswersIds;
    }

    fetch(`http://localhost:8080/user/profile/${tag}/${path}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        loggedInUser_id: loggedInUser_id,
        noOfanswers: a,
        arrayAnswersIds: b,
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
