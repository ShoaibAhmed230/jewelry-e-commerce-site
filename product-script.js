
function closeCartList(){
    document.getElementById("add-to-cart-list-holder").style.display = "none";
}

let cartList = document.getElementById("add-to-cart-list-holder");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    cartList.style.top = "65px";
    
  } else {
    cartList.style.top = "186px";
  }
}
let desiredData; //object which is selected from category page

function showRequiredData(){
  //page information holder code
  let stringArray = JSON.parse(sessionStorage.getItem("selectedCategoryStringArray"));  
  document.querySelector("#page-info-holder h1").innerHTML = stringArray[1];
  document.querySelector("#page-info-holder ").innerHTML += `<p>Home / ${stringArray[0]} /  ${stringArray[1]}</p>`;
  document.title = `${stringArray[1]} | Jewelicious`;

  /////////////////////////////

  console.log(JSON.parse(sessionStorage.getItem("selectedItemObject")));
  desiredData = JSON.parse(sessionStorage.getItem("selectedItemObject"));
  console.log(desiredData.imagepath);
  document.querySelector("#main-product-image-holder img").src = desiredData.imagepath;
  

  document.querySelector("#product-details-holder h1").innerHTML = desiredData.name;
  document.querySelector("#price-p").innerHTML = desiredData.price;

  document.querySelector("#weight-p").innerHTML += desiredData.weight;

  //will show karat p only for gold category
  if(JSON.parse(sessionStorage.getItem("categorySelected").includes("gold"))){
    
    document.querySelector("#karat-p").innerHTML += desiredData.karat;
  }else{
    document.querySelector("#karat-p").style.display = "none";
  }
  

  // showing size div a/c to category
  if((JSON.parse(sessionStorage.getItem("categorySelected").includes("rings"))) || (JSON.parse(sessionStorage.getItem("categorySelected").includes("bangles")))){
    console.log(JSON.parse(sessionStorage.getItem("categorySelected")));
    document.querySelector("#size-div").style.display = "block";
  }else{
    document.querySelector("#size-div").style.display = "none";
  }
  
  
  document.querySelector("#stones-p").innerHTML += desiredData.stones;

  // show sub images
  
  console.log(desiredData.subimages);
  if(desiredData.subimages == "none"){
    document.querySelector("#sub-images").style.display = "none";
  }else{
    document.querySelector("#sub-images").innerHTML = desiredData.subimages.map(element => {
      return `<img src="${element.imagepath}">`
    });
  }
}

showRequiredData();


//global variables

//cartListArray for storing user selected items list
let cartListArray = [];

// get qty of product

let initialQty = 1;
function quantityOfProduct(qty){
   
      if(qty == "add" ){
        initialQty++;
        document.getElementById("show-qty").innerHTML = initialQty;
      }else {
        
        if(initialQty > 1){
          
          initialQty--;
          // console.log(initialQty);
          document.getElementById("show-qty").innerHTML = initialQty;
        }
      }
    
     
}
let isItemAdded = false;
function cartButtonEvent(){
  //displaying recently added item on list 
  document.querySelector("#add-to-cart-list-holder ul").style.display = "block";
  document.querySelector("#cart-details p:first-child").style.display = "block";
  document.querySelector("#show-msg-item-deleted").style.display = "none";
//////////////////////////////////////
 
  if((JSON.parse(sessionStorage.getItem("categorySelected").includes("rings"))) || (JSON.parse(sessionStorage.getItem("categorySelected").includes("bangles")))){
    if(document.querySelector("#size-div input").value != ""){
      document.getElementById("add-to-cart-list-holder").style.display = "flex"; 
     
    }else{
      alert("please mention size");
    }
  }else{
    document.getElementById("add-to-cart-list-holder").style.display = "flex"; 
  }
    
    let desiredData = JSON.parse(sessionStorage.getItem("selectedItemObject"));
    document.querySelector("#add-to-cart-list-holder ul").innerHTML = 
     ` <li>
          <img src="${desiredData.imagepath}"> 
          <div>
             <span>${desiredData.name}</span>
             <span>${desiredData.price}</span>
             <div>
                 <span>Qty: ${initialQty}</span>
                 <span id="cart-size-span">size: ${document.querySelector("#size-div input").value}</span>
             </div>
         </div>
         <i class="far fa-trash-alt" onclick="deleteItem()"></i>
      </li>   ` ;

      // showing/hiding size span from recently added cart div
      if((JSON.parse(sessionStorage.getItem("categorySelected").includes("rings"))) || (JSON.parse(sessionStorage.getItem("categorySelected").includes("bangles")))){
        document.querySelector("#cart-size-span").style.display = "block";
      }else{
        document.querySelector("#cart-size-span").style.display = "none";
      }
      isItemAdded = true;
      addItemtoList(desiredData);
}

function addItemtoList(desiredData){
  if(JSON.parse(sessionStorage.getItem("cartItems")) != null){
    cartListArray = JSON.parse(sessionStorage.getItem("cartItems"));
    console.log(cartListArray);
  }
  let price = desiredData.price;
  price = price.substring(4).trim();
  price *= initialQty;
  document.querySelector("#cart-details #amount").innerHTML = `Rs.${price}`;
  desiredData.qty = initialQty;
  desiredData.size = document.querySelector("#size-div input").value;
  desiredData.amount = price;
  cartListArray.push(desiredData);
  console.log(cartListArray);
  sessionStorage.setItem("cartItems", JSON.stringify(cartListArray));
  document.querySelector("#cart-quantity-indicator").innerHTML = cartListArray.length;
}


//to delete item that is recently added 
function deleteItem(){
  document.querySelector("#show-msg-item-deleted").style.display = "flex";
  document.querySelector("#add-to-cart-list-holder ul").style.display = "none";
  document.querySelector("#cart-details p:first-child").style.display = "none";

  let deleteItem = JSON.parse(sessionStorage.getItem("cartItems"));
  deleteItem.pop();
  console.log(deleteItem);
  sessionStorage.setItem("cartItems", JSON.stringify(deleteItem));
  document.querySelector("#cart-quantity-indicator").innerHTML = JSON.parse(sessionStorage.getItem("cartItems")).length;
}

function checkoutButtonEvent(){
  if(isItemAdded == false){
    let desiredData = JSON.parse(sessionStorage.getItem("selectedItemObject"));
    addItemtoList(desiredData);
  }
  
  
  if((JSON.parse(sessionStorage.getItem("categorySelected").includes("rings"))) || (JSON.parse(sessionStorage.getItem("categorySelected").includes("bangles")))){
    if(document.querySelector("#size-div input").value != ""){
      window.location.href = "billingForm.html";

    }else{
      alert("please mention size");
    }
  }else{
    window.location.href = "billingForm.html";
  }
}

let isFilterNested = JSON.parse(sessionStorage.getItem("isFilterNested"));
let iteratorOfSubImages = 0;
if(desiredData.subimages.length == 1){
  document.querySelector("#right-icon").style.display = "none";
  document.querySelector("#left-icon").style.display = "none";
}
// showing sub images
  function slideArrowClicked(direction){
    if(direction == "left"){
      iteratorOfSubImages--;
      console.log(iteratorOfSubImages);
    }else{
      iteratorOfSubImages++;
      console.log(iteratorOfSubImages);
    }
   
    let totalSubImages = desiredData.subimages.length;
    if(iteratorOfSubImages == totalSubImages-1){
      document.querySelector("#right-icon").style.display = "none";
    }

    if(totalSubImages > iteratorOfSubImages){
      document.querySelector("#left-icon").style.display = "block";
    }
    if(iteratorOfSubImages == 0){
      document.querySelector("#left-icon").style.display = "none";
      document.querySelector("#right-icon").style.display = "block";
    }
    

    let subImageIndex = iteratorOfSubImages;
    document.querySelector("#main-product-image-holder img").src = desiredData.subimages[subImageIndex].imagepath;
  }



let relatedProductsArray = [];

function relatedProducts(){
  let arrayOfItems = JSON.parse( sessionStorage.getItem("specificCategoryItems"));
  console.log(arrayOfItems[0].length);
  let categorySelected = JSON.parse(sessionStorage.getItem("categorySelected"));
  let stringArray = categorySelected.split(' ');
  if(stringArray[0] == "women" || stringArray[0] == "men" || stringArray[0] == "kids"){
    arrayOfItems[0].forEach( (element,index) =>
      {
        gettingArrayOfRelatedCategory(element,index);
      });
      
    }else{
      arrayOfItems.forEach( (element,index) =>
        {
         gettingArrayOfRelatedCategory(element ,index);
        });
        
    }
    function gettingArrayOfRelatedCategory(element , index)
      {
        if(isFilterNested == false){
          element.filter((element,index) => {
            console.log(index);
            if(stringArray[1] == "cufflinks" || stringArray[1] == "nosepins"){
              if(index < 4){
                relatedProductsArray.push(element);
                }
            }else{
              if(index < 4){
                relatedProductsArray.push(element);
                }
            }
          
          });
        }else{
          if(stringArray[1] == "cufflinks" || stringArray[1] == "nosepins"){
            if(index < 4){
              relatedProductsArray.push(element);
              }
          }else{
            console.log(index)
            if(index < 4){
              relatedProductsArray.push(element);
              }
          }
          sessionStorage.setItem("isFilterNested" , false);
        }
       
    }
    console.log(relatedProductsArray);
    document.querySelector("#related-products-holder div").innerHTML = relatedProductsArray.map((element,index) => {
     
     console.log(element);
     if(index < relatedProductsArray.length)
      return   `<figure class="related-products" onclick="window.location='category.html'">
                  <img src="${element.imagepath}">
                  <figcaption>
                    <span>${element.name} </span> 
                    <span>${element.price}</span>
                    <span>Weight ${element.weight}</span>
                  </figcaption>
               </figure>`
    });
}
relatedProducts();
let wishlistItems = [];
function addTowishlist(){
  document.getElementById("transparent-background-heart").style.display = "none";
  document.getElementById("colored-background-heart").style.display = "block";
  (desiredData);
  if(JSON.parse(localStorage.getItem("wishlistItems")) != null){
    wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
    wishlistItems.push(desiredData);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }else{
   
    wishlistItems.push(desiredData);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }
  wishlistQuantityIndicator();
}
function wishlistQuantityIndicator(){
  document.querySelector("#wishlist-quantity-indicator").innerHTML = JSON.parse(localStorage.getItem("wishlistItems")).length;
}
function deleteFromWishlist(){
  document.getElementById("transparent-background-heart").style.display = "block";
  document.getElementById("colored-background-heart").style.display = "none";
  wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
  wishlistItems.pop();
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  wishlistQuantityIndicator();

}