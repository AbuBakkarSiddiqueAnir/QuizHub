
const sign_up_submit_button = document.querySelector("#signup_btn")

sign_up_submit_button.onclick = () =>{
    const sign_up_user_name = document.querySelector("#user_name");
    const sign_up_password = document.querySelector("#password");
    const sign_up_email = document.querySelector("#email_address");


    try{
        fetch("http://localhost:8080/user",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body : JSON.stringify({
                 username : sign_up_user_name.value,
                 email : sign_up_email.value,
                 password : sign_up_password.value
            })
        })
        .then(data =>{
            if(data.status == 201){
                return data.json()
            }
            throw new Error("wrong status code")
        })
        .then(data =>{
            localStorage.setItem("token", data.token);
            loadLogInPage(data)
        }).catch(err =>console.log(err));

    }catch(error){
        console.log(error + "anir")

    }

}
// 

function loadLogInPage(data){
    console.log(data)
    window.location.replace('http://127.0.0.1:5500/client/resources/views/html/home.html') 
}


