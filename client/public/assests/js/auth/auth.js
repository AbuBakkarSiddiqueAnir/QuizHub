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
            if(data.status == 200) return
        })
        .catch(error =>  window.location.replace('login.html'))

    }catch(error){
        window.location.replace('login.html')
    }
}