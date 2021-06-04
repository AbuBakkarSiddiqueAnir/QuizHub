document.addEventListener('DOMContentLoaded',auth())

quizTestParser()

var skip = 0;
localStorage.setItem("skip",skip);

function quizTestParser(){
        
        let skip = localStorage.getItem('skip')

        fetch(`http://localhost:8080/quiz/test/physics?skip=${skip}&limit=1`,{
        method: "GET",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
        })
        .then(response =>response.json())
        .then(data =>{
            data = data.mass_quizess.docs[0]
            console.log(data)
            localStorage.setItem("skip",1+parseInt(skip));
            quizTestHtmlLoader(data)
            

        }).catch(error =>console.log(error))

}


function quizTestHtmlLoader(data) {
    const quizTestArea = document.querySelector("#quiz-test-container");
    
    let optionsHtmlArea = ``

    for(let option of data.options) {
        console.log(option.option)

        let optionHtml = `<input type="radio" id="${option.option}" name="${option.option}" value="${option.option}" style="margin-top:7px" />
                         <label class="option" for="${option.option}">${option.option}</label><br />`

        optionsHtmlArea += optionHtml;
    }

    let testHtml = `<div class="quiz-container-test-area" id="quiz_id" quiz_id="a">
    <div class="test-quiz-area">
      <div class="question-area">
        <h2>
         ${data.question}
        </h2>
      </div>
      <div class="options-area" style="margin-top:30px">
        ${optionsHtmlArea}
      </div>
    </div>
    <div class="quiz-container-btn-area" style="grid-gap: 30px">
      <div class="physics">
        <h3 id="ans-submit">SUBMIT</h3>
      </div>
      <div class="cs">
        <h3 id="prev-question">PREV</h3>
      </div>
      <div class="cs">
        <h3 id="next-question">NEXT</h3>
      </div>
    </div>
    </div> `


    quizTestArea.innerHTML = testHtml;

    document.querySelector('#next-question').addEventListener('click',function(e) {
        nextQuizParser(e)
    })
}

/*  */

function nextQuizParser(e) {
    quizTestParser()
}