
function wishList(){
    let wishlistItemsArray = JSON.parse(localStorage.getItem("wishlistItems"));
if (wishlistItemsArray != null){
    if(wishlistItemsArray.length != 0){
        document.querySelector("table").innerHTML = wishlistItemsArray.map( (element,index) => {
            return `
                    <tr>
                       <td><img src="${element.imagepath}" onclick="showProduct('${(index)}')"></td>
                       <td>${element.name}</td>
                       <td>${element.price}</td>
                       <td> <i class="far fa-trash-alt" onclick="deleteItem(${index})"></i></td>
                       <td><button onclick = "addItemToCart(${index})">Add To cart</button></td>   
                    </tr>`
        }).join(' ');
    
    }else{
        document.querySelector("#empty-list-msg").style.display = "flex";
        document.querySelector("tr").style.display = "none";
    }
}else{
    document.querySelector("#empty-list-msg").style.display = "flex";
}
wishlistQuantityIndicator(); 
  
}
wishList();
function deleteItem(index){
    let wishlistItemsArray = JSON.parse(localStorage.getItem("wishlistItems"));
    wishlistItemsArray.splice(index,1);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItemsArray));
    wishList();
    
    console.log(wishlistItemsArray);
    
    quantityIndicator();
    wishlistQuantityIndicator();

}

function addItemToCart(index){
    let wishlistItemsArray = JSON.parse(localStorage.getItem("wishlistItems"));
    let item = wishlistItemsArray.splice(index,1)[0];
    item.qty = 1;
    item.amount = parseInt((item.price).substring(4).trim());
    console.log(item);
    let cartListArray = [];
    if(JSON.parse(sessionStorage.getItem("cartItems")) != null){
        cartListArray = JSON.parse(sessionStorage.getItem("cartItems"));
        cartListArray.push(item);
      }else{
        cartListArray.push(item);
      }
   sessionStorage.setItem("cartItems" , JSON.stringify(cartListArray));
   console.log(JSON.parse(sessionStorage.getItem("cartItems")));
   quantityIndicator();
 
}

function quantityIndicator(){
    // accessing cart /wishlist no of items indicator
    document.querySelector("#cart-quantity-indicator").innerHTML = JSON.parse(sessionStorage.getItem("cartItems")).length;
  }
function wishlistQuantityIndicator(){
    document.querySelector("#wishlist-quantity-indicator").innerHTML = JSON.parse(localStorage.getItem("wishlistItems")).length;
}

function showProduct(index){
    let wishlistItemsArray = JSON.parse(localStorage.getItem("wishlistItems"));
    sessionStorage.setItem("selectedItemObject", JSON.stringify((wishlistItemsArray.splice(index,1))[0]));
    window.location.href = "productLandingPage.html";
    // console.log(JSON.parse(sessionStorage.getItem("selectedItemObject")));
    
  
}