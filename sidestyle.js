//side bar menu function

function openNav() {
    document.getElementById('side-menu').style.width = "250px";
    document.getElementById('side-menu').style.display = "block";
    
};

function closeNav(){
    document.getElementById('side-menu').style.width = "0px";
};

window.onresize = function() {
    if(window.innerWidth > 992){
      document.getElementById('side-menu').style.width = "100vw";
      document.getElementById('side-menu').style.display = "flex";
    }
    if(window.innerWidth < 992){
      document.getElementById('side-menu').style.width = "0";
      document.getElementById('side-menu').style.display = "none";
    }
}

//updown button function

var mybutton = document.getElementById("updown");
      
      
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//drop down value getting function
function categorySelected(category){
  console.log(category);
  sessionStorage.setItem("categorySelected", JSON.stringify(category));
  window.location.href = "category.html";
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
 
  document.getElementById("account-ul").innerHTML = `
  <li id="login-li"><a href="login.html">Login</a></li>
  <li><a href="signup.html">Register</a></li>
  `;
  localStorage.removeItem("loginUserInfo");
 
}

wishlistQuantityIndicator();
function wishlistQuantityIndicator(){
   document.querySelector("#wishlist-quantity-indicator").innerHTML = JSON.parse(localStorage.getItem("wishlistItems")).length;
}

function quantityIndicator(){
  // accessing cart /wishlist no of items indicator
  document.querySelector("#cart-quantity-indicator").innerHTML = JSON.parse(sessionStorage.getItem("cartItems")).length;
  console.log(JSON.parse(sessionStorage.getItem("cartItems")).length);
}
quantityIndicator();
