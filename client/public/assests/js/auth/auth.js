
//auth() manages the user authentication in the whole website
function auth() {
  try {
    fetch("http://localhost:8080/user/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {


        //those variables are available in scope of any function call through out the whole website to access user data and update
        loggedInUser_id = data._id;
        noOfCorrectAnswersInPhysics = data.correctAnswerInPhysics;
        noOfWrongAnswersInPhysics = data.wrongAnswerInPhysics;
        noOfCorrectAnswersInCs = data.correctAnswerInCS;
        noOfWrongAnswersInCs = data.wrongAnswerInCS;
        noOfCorrectAnswersInGi = data.correctAnswerInGI;
        noOfWrongAnswersInGi = data.wrongAnswerInGI;
        noOfCorrectAnswersInOther = data.correctAnswerInOther;
        noOfWrongAnswersInOther = data.wrongAnsweredInOther;

        arrayOfCorrectAnswersIds = data.c_answeredQuizIds;
        arrayOfWrongAnswersIds = data.w_answeredQuizIds;
       
        return displayLoggedInUsername(data);
      })
      .catch((error) => window.location.replace("login.html"));
  } catch (error) {
    window.location.replace("login.html");
  }
}

//displayLoggedInUsername() displays the username in the website 

function displayLoggedInUsername(data) {
  const usernameArea = document.querySelector("#loggedin-username");
  usernameArea.innerText = data.username;
}

//if any user is previously authenticated then authOnLogin() takes him directly to the home page

function authOnLogin() {
  try {
    fetch("http://localhost:8080/user/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("previously logged in");
        return window.location.replace("home.html");
      })
      .catch((error) => {
        console.log("not logged in");
      });
  } catch (error) {
    return;
  }
}
