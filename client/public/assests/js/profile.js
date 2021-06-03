document.addEventListener('DOMContentLoaded',auth())

document.addEventListener('DOMContentLoaded', myQuizessLoaded());



function myQuizessLoaded() {
    try {
        fetch("http://localhost:8080/quiz/profile/",{
            method: "GET",
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data =>{
            loadHTMLTable(data, "profile")
        }).catch(error =>console.log(error))
    }catch(error) {

    }
}



document.addEventListener("click", function (event){

    if(event.target.classList.contains("delete")){

        try {
            fetch(`http://localhost:8080/quiz/profile/${event.target.getAttribute("quiz_id")}`,{
                method: "DELETE",
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => response.json() )
            .then(data =>{
                notifier(data, event)
            }).catch(error => notifier(error) )

        }catch(error) {
            console.log(error)
        }

    }else if(event.target.classList.contains("edit")){
        try {
            fetch(`http://localhost:8080/quiz/profile/${event.target.getAttribute("quiz_id")}`,{
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => response.json() )
            .then(data =>{
                console.log(data)
                updateQuiz(event ,data)
            }).catch(error => console.log(error) )

        }catch(error) {
            console.log(error)
        }   
    }
})


function notifier(data, event){
    let element = event.target.parentElement.parentElement.parentElement
    element.innerHTML = `<div style="display:flex;justify-content:center;align-items:center"> <h3> Quiz has been successfully deleted </h3></div>`
    setTimeout(() => {
        element.remove();
    }, 1100);
    console.log(data)
}


function updateQuiz(event, data) {
    let element = event.target.parentElement.parentElement.parentElement
    let optionsOfquiz = ``;
    let idGenerator = 1;
    for(let option of data.options){
        let optionOfquiz = ``
        
        optionOfquiz += `<div class="inlineblock">
                       
                        <input style="margin-top:8px; margin-left:15px;" type="text" id="option${idGenerator}" value="${option.option}" name="option1" placeholder="">
                    </div>`
        idGenerator++;
        optionsOfquiz += optionOfquiz;
    }

    let updateQuizInput = `
    <div class="quiz-container-add-area">
    <div class="add-quiz-area"  style="flex-direction:column">
    <div class="add-question-area">
        
        <textarea type="text" name="question" value="${data.question}" id="question">${data.question} </textarea>
        <div class="inlineblock">
            <label>Answer</label>
            <input type="text" value="${data.answer}" id="answer" name="option1" placeholder="Type correct option" style="font-weight: bold;" >
            <label>Catagory</label>
            <input type="text" id="tags" value="${data.tag}" name="option1" placeholder="physics or cs or gi" style="font-weight: bold;">
        </div>
          
    </div>
    <div class="add-question-option-area">
            ${optionsOfquiz}         
    </div>
    <div>
        <div class="updateBtn" id="updateBtn" quiz_id="${data._id}"> UPDATE </div> 
    </div
    
    </div>
    </div>
    `

    element.innerHTML = updateQuizInput;
   
}

document.getElementById("updateBtn").addEventListener("click",updatingQuizInput(event))
function updatingQuizInput(event){

    const question = document.querySelector("#question");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const tags = document.querySelector("#tags");
    const answer = document.querySelector("#answer");
    const quiz_id_btn = document.querySelector("#updateBtn");
    

    if(question.value !== "" && option1.value !== "" && option2.value !== "" && option3.value !== "" && option4.value !== ""){
        
        fetch(`http://localhost:8080/quiz/profile/${quiz_id_btn.getAttribute("quiz_id")}`,{
            method: "PATCH",
            headers:{
                "Content-type":"application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body : JSON.stringify({
                 question : question.value,
                 options : [
                     {
                         option : option1.value
                     },
                     {
                         option : option2.value
                     },
                     {
                         option : option3.value
                     },
                     {
                         option : option4.value
                     }
                    ],
                 answer : answer.value,
                 tag : tags.value
            })
        })
        .then(data =>{
            if(data.status === 200){
                

                question.value = "" 
                option1.value = "";
                option2.value = "";
                option3.value = "";
                option4.value = "";
                answer.value = "";
                tags.value = "";

                return data.json()
            }
            throw new Error("wrong status code")
        })
        .then(data =>{
            console.log(data)
        }).catch(err =>{
            event.preventDefault()
            console.log(err)
        } );
    }else{
        alert("Fill out the whole form before submitting")
    }   
}