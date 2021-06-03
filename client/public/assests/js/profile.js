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

        

    }else{

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







