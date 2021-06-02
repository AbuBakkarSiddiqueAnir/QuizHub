
document.addEventListener("DOMContentLoaded",function(){
    fetch("http://localhost:8080/quiz/mass_quizess",{
        method: "GET",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response =>response.json())
    .then(data =>{
        console.log(data)
    }).catch(error =>console.log(error))
})


