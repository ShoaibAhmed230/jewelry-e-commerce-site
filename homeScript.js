
let getUserReview = function(){
   fetch("./jewelicious.json")
    .then(rawData => rawData.json())
    .then(data => {
        let testimonialSlider = document.querySelector("#testimonial-slider>div");
        let totalReviews = 1 ;
         data.users.forEach( user => {
            if(user.review != ""){
                ++totalReviews;
            }
        });
        console.log((totalReviews*100)+"vw");
        testimonialSlider.style.width = ((totalReviews*100))+"vw";
        let sliderContainer = document.getElementById("slider-container");
        sliderContainer.innerHTML += data.users.map( user => `<div class="reviews">
        <i class="fas fa-quote-left"></i>
        <p>${user.review}</p> <span>- ${user.name}</span>
        </div>`).join(' ');
        
    });
}
getUserReview();



