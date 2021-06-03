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



