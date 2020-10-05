function showUserInfo(){
    let userLogin = JSON.parse(localStorage.getItem("loginUserInfo"));
    console.log(userLogin[0].name);
    document.getElementById("user-name").innerHTML = userLogin[0].name;
    document.getElementById("full-name").innerHTML = userLogin[0].name;
    
    document.getElementById("email").innerHTML = userLogin[0].email;
      
}
accountFunctionality();
function accountFunctionality(){
  let userLogin = JSON.parse(localStorage.getItem("loginUserInfo"));
  console.log(userLogin);
  if(userLogin != null){
    document.getElementById("account-ul").innerHTML = `
    <li id="login-li"><a href="dashboard.html">My Account</a></li>
    <li><a href="" onclick="logout()">LogOut</a></li>
    `
  }else{
    logout();
  }
}
function logout(){
  window.location.href ="index.html";
    document.getElementById("account-ul").innerHTML = `
    <li id="login-li"><a href="login.html">Login</a></li>
    <li><a href="signup.html">Register</a></li>
    `;
    localStorage.removeItem("loginUserInfo");
   
  }
showUserInfo();