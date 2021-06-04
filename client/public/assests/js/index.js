
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
    let idGenerator = 100;
    for(let quiz of data.mass_quizess){
        
        var tableHTML = `<div class="my-quizess-area"> <div > <h2 style="height:auto;word-wrap: break-word;" id="to-update-question"> ${index}. ${quiz.question}</h2></div> <div class="options-area">`
        let option1 = ``;
        for(let option of quiz.options){
            option1 += `<label class="option" id="${idGenerator}"> ->${option.option}</label><br>`
            idGenerator++;
        }
        tableHTML += option1; 
        tableHTML += `<h3 style="margin-top: 15px; margin-left:35px;" id="to-update-answer"> Answer : ${quiz.answer} </h3>`
        tableHTML += `<h4 style="margin-top: 7px; margin-left:35px;" id="to-update-quiztag"> Catagory : ${quiz.tag} </h4>`
        if(page === "profile"){
            tableHTML += `<h3  style="margin-top: 0px; margin-left:90%; "> <i quiz_id=${quiz._id} quiz_index="${index}" style="cursor:pointer" class="fas fa-edit edit"></i> </h3>`
            tableHTML += `<h3 style="margin-top: 8px; margin-left:90%; cursor:pointer";> <i quiz_id=${quiz._id}  class="fas fa-trash delete"></i> </h3>`  
        }  
        tableHTML += ` </div>
        </div>`

        tableData += tableHTML;
        index++;
       
    }
    table.innerHTML += tableData
}
