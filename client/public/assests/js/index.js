
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