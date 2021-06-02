

function checkAuth(){
    if(localStorage.getItem("token")){
        fetch("http://localhost:8080/user",{
            method: "GET",
            headers:{
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        }).then((data) => {
            if(data.status === 200){
                window.location.replace("'http://127.0.0.1:5500/client/resources/views/html/home.html")
            }
            else{
                alert(data.status)
            }
        }).catch((error) => {
            alert(error)
        })
    }
}

function auth(){
   if(localStorage.getItem("token")){
    $.ajax({
        type:"GET",
        url:DOMAIN+ "user",
        headers: {
            Authorization:
              localStorage.getItem("token_type") +
              " " +
              localStorage.getItem("token"),
          }
    }).done(function(response) {
         if(response.success){
             
            event.preventDefault();

           
             //window.location.href = "http://127.0.0.1:5500/resources/views/auth/home-page.html";
         }else{
            window.location.replace("http://127.0.0.1:5500/resources/views/auth/login.html")
         }
    }).fail(function(err){
        console.log(err)
     })
   }else{
    window.location.replace("http://127.0.0.1:5500/resources/views/auth/login.html")
 }
}
