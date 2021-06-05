document.addEventListener('DOMContentLoaded',auth())

document.addEventListener('DOMContentLoaded', quizTestParser(skip = 0))

var answer ;


function quizTestParser(skip){

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
            quizTestHtmlLoader(data, skip)
            
        }).catch(error => {
          notifier(error)
        })


        function quizTestHtmlLoader(data,skip) {

          const quizTestArea = document.querySelector("#quiz-test-container");
          let optionsHtmlArea = ``
      
          for(let option of data.options) {

              let optionHtml = `<input type="radio" id="${option.option}" name="options" value="${option.option}" style="margin-top:7px" />
                               <label class="option" for="${option.option}">${option.option}</label><br />`
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
                        </div> `
      
          
          quizTestArea.innerHTML = testHtml;
          const notification = document.querySelector("#notification");
          notification.innerText = "Physics Quiz Test"
      
          document.querySelector('#next-question').addEventListener('click',function(e) {
              nextQuizParser(e ,skip = skip+1)
          })

          document.querySelector('#prev-question').addEventListener('click',function(e) {
            nextQuizParser(e, skip = skip-1)
          })

          document.querySelector('#ans-submit').addEventListener('click',function(e) {
            answerSubmit(answer)
          })
      }


      function nextQuizParser(e ,skip) {
        quizTestParser(skip)
     }
     
     function notifier(error){
        const notification = document.querySelector("#notification");
        notification.innerText = "We got no more quiz for you"
     }

     
     function answerSubmit(answer) { 
          
          var getSelectedValue = document.querySelector('input[name="options"]:checked');   
          if(getSelectedValue === null){
            console.log("not selected")
          }  
          else if(getSelectedValue.value === answer) {   
              updateUserProfileForCorrectAnswer()
          }   
          else {   
              console.log("Wrong selection", getSelectedValue, "answer",answer)   
          }   
        
      }  

     function updateUserProfileForCorrectAnswer() {
       
      const quiz_id_element_for_answer_submission = document.querySelector("#quiz_id_for_answer_submission");
      const quiz_id = quiz_id_element_for_answer_submission.getAttribute("quiz_id")

      arrayOfCorrectAnswersIds.push({
        quizids : quiz_id
      });

      fetch(`http://localhost:8080/user/profile/physics/correct-ans`,{
          method: "PATCH",
          headers:{
              "Content-type":"application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
          },
          body : JSON.stringify({
            loggedInUser_id : loggedInUser_id,
            noOfCorrectAnswers : noOfCorrectAnswers,
            arrayOfCorrectAnswersIds : arrayOfCorrectAnswersIds
              
            })
        })
        .then( data => {
            if(data.status === 200){
              return data.json()
            }
            throw new Error("wrong status code")
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    
    }   

}




/*  */



