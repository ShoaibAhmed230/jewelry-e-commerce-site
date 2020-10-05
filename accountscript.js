
function register(){
   let userName = document.getElementById("userName").value;
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

     const newUser = {
            name : userName,
            email : email,
            password : password,
            isLogin : false
     }  
    
    
       
        
        let newUsers = [];
        if( JSON.parse(localStorage.getItem("newUsers") !== null)){
         JSON.parse(localStorage.getItem("newUsers")).forEach( user =>  newUsers.push(user));
         console.log(newUsers);
         newUsers.push(newUser);
         localStorage.setItem("newUsers",JSON.stringify(newUsers));
         window.location.href = "login.html"; 
         console.log(JSON.parse(localStorage.getItem("newUsers")));

        }else{
         newUsers.push(newUser);
         localStorage.setItem("newUsers",JSON.stringify(newUsers));
         window.location.href = "login.html"; 
         // console.log(JSON.parse(localStorage.getItem("newUsers")));
        }
             
   
}



function login(){

   let loginEmail = document.getElementById("loginEmail").value;
   let LoginPassword = document.getElementById("loginPassword").value;

   fetch("./jewelicious.json")
   .then(rawData => rawData.json())
   .then(data => {

      let allUsers = [];
      data.users.forEach(user => {
         allUsers.push(user);
        
      });
      JSON.parse(localStorage.getItem("newUsers")).forEach( user => allUsers.push(user));
      console.log(allUsers);
      let loginUserInfo = allUsers.filter( user =>{
        if(loginEmail == user.email && LoginPassword == user.password){
                 return user;
        }   
      });
   console.log(loginUserInfo);
        if(loginUserInfo.length == 0){
        alert("invalid email or password");
        }else{
         loginUserInfo.isLogin = true;
         localStorage.setItem("loginUserInfo" , JSON.stringify(loginUserInfo));
         window.location.href = "index.html";
        }
       
     
   });
}
