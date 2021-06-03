
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


function loadHTMLTable(data, page){
    
    const table = document.querySelector("#my-quizess-container");
    table.innerHTML = ""
    let tableData = ``
    let index = 1;
    for(let quiz of data.mass_quizess){
        
        var tableHTML = `<div class="my-quizess-area"> <div> <h2> ${index}. ${quiz.question}</h2></div> <div class="options-area">`
        let option1 = ``;
        for(let option of quiz.options){
            option1 += `<label class="option"> ->${option.option}</label><br>`
        }
        tableHTML += option1; 
        tableHTML += `<h3 style="margin-top: 15px; margin-left:35px;"> Answer : ${quiz.answer} </h3>`
        tableHTML += `<h4 style="margin-top: 7px; margin-left:35px;"> Catagory : ${quiz.tag} </h4>`
        if(page === "profile")  tableHTML += `<h3 style="margin-top: 0px; margin-left:90%"> <i class="fas fa-trash"></i> </h3>`
        tableHTML += ` </div>
        </div>`

        tableData += tableHTML;
        index++;
       
    }
    table.innerHTML += tableData
}
