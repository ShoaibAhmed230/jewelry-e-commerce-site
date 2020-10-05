
 let totalAmount = 0;

function showListOfSelectedProducts(){
    let cartItemsArray = JSON.parse(sessionStorage.getItem("cartItems"));
    console.log(cartItemsArray);
   
    document.querySelector("#product-list-holder ul").innerHTML = cartItemsArray.map( element => {
       
        totalAmount = totalAmount + (element.amount);
        console.log(totalAmount);
        return`
        <li>
            <img src="${element.imagepath}">
            <div>
                <span>${element.name}</span>
                <span>Qty: ${element.qty}</span>
            </div>
                <span>${element.price} </span>
                <i class="far fa-trash-alt"></i>
        </li>`
    }).join(' ');
    document.querySelector("#sub-total-holder p span").innerHTML = `Rs. ${totalAmount}`;
    document.querySelector("#total-amount p span").innerHTML = `Rs. ${totalAmount}`;

}

function collectInfoForBill(){
   let name = document.querySelector("#name").value;
   let email = document.querySelector("#email").value;
   let contactNumber = document.querySelector("#contact-number").value;
   let address = document.querySelector("#address").value;
   let appartment = document.querySelector("#appartment").value;
   let city = document.querySelector("#city").value;
   let country = document.querySelector("#country").value; 
   let postalCode = document.querySelector("#postal-code").value;
   let completeCheckoutDetail = {
       name,
       email,
       contactNumber,
       address,
       appartment,
       city,
       country,
       postalCode,
       totalAmount, 
   }
   sessionStorage.setItem("completeCheckoutDetail" , JSON.stringify(completeCheckoutDetail));
   window.location.href = "order-confirmed.html";
}

showListOfSelectedProducts();