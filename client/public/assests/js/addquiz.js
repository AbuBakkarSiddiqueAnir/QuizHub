document.addEventListener('DOMContentLoaded',auth())

const add_quiz_submit = document.querySelector("#add-quiz-submit")
add_quiz_submit.onclick = (event) =>{
    const question = document.querySelector("#question");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const tags = document.querySelector("#tags");
    const answer = document.querySelector("#answer");


    if(question.value !== "" && option1.value !== "" && option2.value !== "" && option3.value !== "" && option4.value !== ""){
        
        fetch("http://localhost:8080/quiz/profile",{
            method: "POST",
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
            if(data.status === 201){
                return data.json()
            }
            throw new Error("wrong status code")
        })
        .then(data =>{
            addquizsuccess(data)
        }).catch(err =>{
            event.preventDefault()
            addquizunsuccess(err)
        } );
    }else{
        console.log("FILL THE FORM")
    }   
}

function addquizsuccess(data){
    const addQuizBtnH2 = document.querySelector("#add-quiz-h2");
    addQuizBtnH2.innerText = "Successfully added the quiz";
    setTimeout(() =>{
        addQuizBtnH2.innerText = "Add your quiz !!"
    },1500)
}



function addquizunsuccess(err){
    const addQuizBtnH2 = document.querySelector("#add-quiz-h2");
    addQuizBtnH2.innerText = "Unsuccessful atempt to add quiz";
    setTimeout(() =>{
        addQuizBtnH2.innerText = "Add your quiz !!"
    },1500)
}

















//select option section

