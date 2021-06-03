
const logOutBtn = document.querySelector("#logout")

logOutBtn.addEventListener("click",function(){

    fetch("http://localhost:8080/user/logout",{
        method: "POST",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => {
        logingOutFromQuizHub(data)
    }).catch( error => unsuccessfulLogOutFromQuizHub(error))
})


const logingOutFromQuizHub = (data) => {
    console.log(data)
    window.location.replace('login.html')    
}

const unsuccessfulLogOutFromQuizHub = (error) => {
    console.log(error)
    window.location.replace('home.html')
}


function loadHTMLTable(data){
    
    const table = document.querySelector("#my-quizess-container");
    table.innerHTML = ""
    let tableData = ``

    for(let quiz of data.mass_quizess){
        var tableHTML = `<div class="my-quizess-area"> <div> <h2>${quiz.question}</h2></div> <div class="options-area">`
        let option1 = ``;
        for(let option of quiz.options){
            option1 += `<label class="option"> ->${option.option}</label><br>`
        }
        tableHTML += option1; 
        tableHTML += `<h3> Answer : ${quiz.answer} </h3>`
        tableHTML += ` </div>
        </div>`

        tableData += tableHTML
       
    }
    table.innerHTML += tableData
}
