
const login_submit_btn = document.querySelector("#login_submit_btn")

login_submit_btn.onclick = (event) =>{
    const login_username = document.querySelector("#login_username");
    const login_password = document.querySelector("#login_password");

    if(login_username.value !== "" && login_password.value !== ""){
        
        fetch("http://localhost:8080/user/login",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body : JSON.stringify({
                 username : login_username.value,
                 password : login_password.value
            })
        })
        .then(data =>{
            if(data.status === 200){
                return data.json()
            }
            throw new Error("wrong status code")
        })
        .then(data =>{
            localStorage.setItem("token", data.token);
            loadHomePage(data)
        }).catch(err =>{
            event.preventDefault()
            signUpNotices(err)
        } );
    }else{
        console.log("fill the login form")
    }

   
       

}
// 

function loadHomePage(data){
    console.log(data)
    window.location.replace('home.html') 
}


document.getElementById("signupbtn").onclick = () => {
    window.location.replace('signup.html')
}


function signUpNotices(err) {
   const signupnotice = document.querySelector("#signupnotice");
   console.log(err);
  return signupnotice.innerText = "Your username or password is not correct"
}