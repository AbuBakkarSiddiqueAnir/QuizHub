
document.addEventListener('DOMContentLoaded', auth())

document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:8080/quiz/mass_quizess/physics",{
        method: "GET",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response =>response.json())
    .then(data =>{
        console.log(data)
        loadHTMLTable(data)
    }).catch(error =>console.log(error))
})




document.onclick = (event) => {

    const request = () => {
        fetch(`http://localhost:8080/quiz/mass_quizess/${tag}`,{
            method: "GET",
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response =>response.json())
        .then(data =>{
            console.log(data)
        return loadHTMLTable(data,"quizess")
        }).catch(error =>console.log(error))
   }

   let tag;

   if(event.target.id === "cs" || event.target.id === "h3c"){
      tag = "cs";
      activeTagBtn(event.target)
      request();
   }else if(event.target.id === "gi" || event.target.id === "h3g"){
      tag = "gi";
      activeTagBtn(event.target)
      request();
   }else if(event.target.id === "physics" || event.target.id === "h3p"){
      tag = "physics";
      activeTagBtn(event.target)
      request();
   }else if(event.target.id === "other" || event.target.id === "h3o"){
      tag = "other";
      activeTagBtn(event.target)
      request();
 }
}


function loadingAnimation() {
    const table = document.querySelector("#table-area");
    table.innerHTML = `<div class="loader"></div>`  
}


const activeTagBtn = (btn) => {
    const physicsBtn = document.querySelector("#physics");
    const csBtn = document.querySelector("#cs");
    const gi = document.querySelector("#gi");
    const other = document.querySelector("#other");

    if(btn.id === "h3p" || btn.id === "h3c" || btn.id === "h3g" || btn.id === "h3o"){
        physicsBtn.style.backgroundColor = "#0deb99"
        csBtn.style.backgroundColor = "#0deb99"
        gi.style.backgroundColor = "#0deb99";
        other.style.backgroundColor = "#0deb99"

        btn.parentNode.style.backgroundColor = "#0a8256"

    }else{
        physicsBtn.style.backgroundColor = "#0deb99"
        csBtn.style.backgroundColor = "#0deb99"
        gi.style.backgroundColor = "#0deb99"
        other.style.backgroundColor = "#0deb99"

        btn.style.backgroundColor = "#0a8256"
    }

}

