document.addEventListener('DOMContentLoaded',auth())


const answerSubmit = document.querySelector("#answer-submit");
const prevQuestion = document.querySelector("#prev-question");
const nextQuestion = document.querySelector("#next-question");




answerSubmit.onclick = (event) => {

}


prevQuestion.onclick = (event) => {

}

let skip = 0;

nextQuestion.onclick = (event) => {
    
    nextAndPrevQuestionLoader(skip);
    skip++;
}


function nextAndPrevQuestionLoader(skip) {

    fetch(`http://localhost:8080/quiz/profile/?limit='10'&skip='${skip}'`,{
        method: "GET",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data =>{
        return loadQuestion(data)
    })
    .catch(error => console.log(error) )
}

function loadQuestion(data){
   return console.log(data)
}




