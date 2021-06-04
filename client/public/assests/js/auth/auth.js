function auth() {
    try{ 
        fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data => {
            return displayLoggedInUsername(data)
        })
        .catch(error =>  window.location.replace('login.html'))

    }catch(error){
        window.location.replace('login.html')
    }
}

function displayLoggedInUsername(data){
    const usernameArea = document.querySelector("#loggedin-username");
    usernameArea.innerText = data.username;

}


function authOnLogin() {
    try{ 
        fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("previously logged in")
             return window.location.replace("home.html")
        })
        .catch(error =>  {
            console.log("not logged in")
        })

    }catch(error){
        return 
    }
}