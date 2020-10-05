function orderDetails(){
   let completeCheckoutDetails = JSON.parse(sessionStorage.getItem("completeCheckoutDetail"));
   console.log(completeCheckoutDetails);
   document.querySelector("#name").innerHTML = completeCheckoutDetails.name;
   document.querySelector("#email").innerHTML = completeCheckoutDetails.email;
   document.querySelector("#contact-number").innerHTML = completeCheckoutDetails.contactNumber;
   document.querySelector("#address").innerHTML = completeCheckoutDetails.address;
   document.querySelector("#city").innerHTML = completeCheckoutDetails.city;
   document.querySelector("#country").innerHTML = completeCheckoutDetails.country;
   document.querySelector("#postal-code").innerHTML = completeCheckoutDetails.postalCode;

   document.querySelector("#total").innerHTML = `Rs. ${completeCheckoutDetails.totalAmount}`;

   let cartItemsArray = JSON.parse(sessionStorage.getItem("cartItems"));
   document.querySelector("#product-details-holder").innerHTML = cartItemsArray.map( element =>{
       return `
      <div class="details-of-product">
       <p>Name : <span>${element.name}</span></p>
       <p>Quantity : <span>${element.qty}</span></p>
       <p>Price:  <span>${element.price}</span></p>
       </div>
       `

   })
}

function orderDone(){
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("completeCheckoutDetail");
    window.location.href = "index.html";
}
orderDetails();