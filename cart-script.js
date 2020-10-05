function cartList(){
    let cartItemsArray = JSON.parse(sessionStorage.getItem("cartItems"));
    console.log(cartItemsArray);
if (cartItemsArray != null){
    if(cartItemsArray.length != 0){
        let totalAmount = 0;
        document.querySelector("table").innerHTML = cartItemsArray.map( (element,index) => {
           
            totalAmount = totalAmount + (element.amount);
            // console.log(totalAmount);
            return `
                    <tr>
                       <td><img src="${element.imagepath}"></td>
                       <td>${element.name}</td>
                       <td>${element.price}</td>
                       <td>Qty: ${element.qty}</td>
                       <td>SubTotal: Rs. ${element.amount}</td>
                       <td> <i class="far fa-trash-alt" onclick="deleteItem(${index})"></i></td>   
                    </tr>`
        }).join(' ');
        document.querySelector("#amount-holder span").innerHTML = `Rs. ${totalAmount}`;
    
    }else{
        document.querySelector("#empty-list-msg").style.display = "flex";
        document.querySelector("#amount-button-holder").style.display = "none";
        document.querySelector("tr").style.display = "none";
    }
}else{
    document.querySelector("#empty-list-msg").style.display = "flex";
    document.querySelector("#amount-button-holder").style.display = "none";
}
    
  
}

function deleteItem(index){
    let cartItemsArray = JSON.parse(sessionStorage.getItem("cartItems"));
    console.log("delete button "+ index);
    cartItemsArray.splice(index,1);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
    cartList();
    
    console.log(cartItemsArray);
    
    quantityIndicator();
}
function quantityIndicator(){
    // accessing cart /wishlist no of items indicator
    document.querySelector("#cart-quantity-indicator").innerHTML = JSON.parse(sessionStorage.getItem("cartItems")).length;
    console.log(JSON.parse(sessionStorage.getItem("cartItems")).length);
  }

cartList();