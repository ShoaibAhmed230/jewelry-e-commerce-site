
function FetchCategoryData(){
  this.categorySelected = sessionStorage.getItem("categorySelected");
  this.stringArr = this.categorySelected.substring(1,this.categorySelected.length-1).split(" ");
  sessionStorage.setItem("selectedCategoryStringArray",JSON.stringify(this.stringArr));  
  this.selectedArrayData = [];
  this.dsgGatherDataThroughLoop = [];
  this.cartButtonArray = [];
  this.dsgFilterArrayCategories = []; //stories true and false values for men women kids who finds data
   
  this.fetchData = function (){

      fetch("./jewelicious.json")
      .then(rawData => rawData.json())
      .then(data => {

          if(this.stringArr[0]=="women" || this.stringArr[0]=="men" || this.stringArr[0]=="kids"){
            console.log(data.categories);

            
             let mainCategory =  data.categories.filter(category => {
             console.log(Object.keys(category)[0]);
               if(Object.keys(category)[0] === this.stringArr[0]){
                console.log(category);  
                return category;
                  
                }
              });
           
             let mainSelectedCategoryData = mainCategory.map(element => {
              let values = Object.values(element)[0].filter(subelement => { //getting value of object key
                if(Object.keys(subelement)[0] === this.stringArr[1]){
                  console.log(subelement);
                  return subelement;
                } 
               
              }); 
              return values[0];
            });
            this.selectedArrayData = mainSelectedCategoryData.map(element => {
                subValues = Object.values(element)[0].map(subelement => { //getting value of object key
               
                console.log( subelement);//silver, gold,diamond
                  
                let finalData = Object.values(subelement)[0];
                console.log(finalData);
                return finalData;
              });
            
            return subValues;
             
             
          }); 
          console.log(this.selectedArrayData);
          sessionStorage.setItem("specificCategoryItems", JSON.stringify(this.selectedArrayData));
            document.querySelector('.mendaimond').innerHTML = this.selectedArrayData.map(element=>
              element.map(element=> element.map(element => {
              
              
                return `
                  <div class="figure-div">
                  
                  <figure>
                       
                  <i class="far fa-heart heart"></i>
                  <i class="fas fa-heart heart-fill"></i> 
                       
                        <img src=${element.imagepath}>
                  <figcaption>
                    ${element.name}
                      <br>
                      <strong>${element.price}</strong>
                      
                      <div class="ratingstars">
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                      </div>
                        <button >Add To Cart</button>
                  </figcaption>
                  </figure>
                  </div> `
             }
          )));
      }else{
        
          let mainCategory =  data.categories.filter(category => {
              // returning main Categories men,women,kids
              console.log(Object.keys(category));

             let subCategory = Object.values(category)[0].filter( subCategory => {
                // console.log(subCategory);
                //returning sub categories selected by user category like pendant/anklets/etc
               
                if(Object.keys(subCategory)[0] === this.stringArr[1]){
                  // console.log(subCategory);

                  //will return selected material category by user like gold/silver/diamond
                 let finalData = Object.values(subCategory)[0].filter( materialCategory =>{
                      if(Object.keys(materialCategory)[0] === this.stringArr[0]){
                      console.log(materialCategory);
                        //will keep this array of selected categories in global variable for future use
                         this.selectedArrayData = Object.values(materialCategory)[0];

                      //returning array and displaying that array in list
                      document.querySelector('.mendaimond').innerHTML += this.selectedArrayData.map(element => {
                      
                        return `
                                 <div class="figure-div" >
                                 <figure>
                                 <i class="far fa-heart heart"></i>
                                 <i class="fas fa-heart heart-fill"></i> 
                                
                                 <img src=${element.imagepath}>
                                 <figcaption>
                                   ${element.name}
                                     <br>
                                     <strong>${element.price}</strong>
                                     
                                     <div class="ratingstars">
                                         <i class="fa fa-star-o" aria-hidden="true"></i>
                                         <i class="fa fa-star-o" aria-hidden="true"></i>
                                         <i class="fa fa-star-o" aria-hidden="true"></i>
                                         <i class="fa fa-star-o" aria-hidden="true"></i>
                                         <i class="fa fa-star-o" aria-hidden="true"></i>
                                     </div>
                                     <button >Add To Cart</button>   
                                 </figcaption>
                                 </figure>
                                 </div> `
                      });
                      this.dsgGatherDataThroughLoop.push(this.selectedArrayData);
                      return this.selectedArrayData;
                    }
                  });
                
                  return finalData; 
                }
              });
              this.dsgFilterArrayCategories.push(subCategory);
                  
             return subCategory;
           });
         
         this.dsgFilterArrayCategories.map((element,index) => {
          if(element.length == 0){
          this.dsgGatherDataThroughLoop.splice(index,0,[]);
            console.log(this.dsgGatherDataThroughLoop);
          }
         })
           sessionStorage.setItem("specificCategoryItems", JSON.stringify(this.dsgGatherDataThroughLoop));
        }
        let isFilterNested = false;
        
        let allImagesDiv = (wmkData , dgsData) => {
          let arrayOfDivs = document.querySelectorAll(".figure-div img");
          arrayOfDivs.forEach((element,index) => {
            let  displayedData;
            let stringArray = this.stringArr;
            if(stringArray[0] == "women" || stringArray[0] == "men" || stringArray[0] == "kids"){
              displayedData = wmkData;
            }else{
              displayedData = dgsData;
              
            }
            
            let iteratorCounter=0;
            element.onclick = function()  {
            indexOfSelectedDiv = index;
            if(stringArray[0] == "women" || stringArray[0] == "men" || stringArray[0] == "kids"){
              let selectedDivData = displayedData[0].map(element=> {
                
              if(isFilterNested == false){
                console.log(isFilterNested);
                sessionStorage.setItem("isFilterNested", JSON.stringify(isFilterNested));
                element.map(element => {
                  iteratorCounter++;
                  if((iteratorCounter-1) == indexOfSelectedDiv){
                    console.log(element);
                    sessionStorage.setItem("selectedItemObject", JSON.stringify(element));
                    window.location.href = "productLandingPage.html"; 
                    return element;
                  }
                })
               
              }else{
                sessionStorage.setItem("isFilterNested", JSON.stringify(isFilterNested));
                console.log(isFilterNested);
                console.log(element);
                
                  iteratorCounter++;
                  if((iteratorCounter-1) == indexOfSelectedDiv){
                    console.log(element);
                    sessionStorage.setItem("selectedItemObject", JSON.stringify(element));
                    window.location.href = "productLandingPage.html"; 
                    return element;
                  }
              }
                return element;
              })
            }else{
              let selectedDivData = displayedData.map(element=> {
                element.map(element => {
               
                iteratorCounter++;
                  if((iteratorCounter-1) == indexOfSelectedDiv){
                    console.log(element);
                    sessionStorage.setItem("selectedItemObject", JSON.stringify(element));
                    window.location.href = "productLandingPage.html"; 
                    return element;
                  }
                })
                return element;
              })
            }
          }
      })
    }

        allImagesDiv(this.selectedArrayData , this.dsgGatherDataThroughLoop);
      
          //aside filter list
          let asideFilterList = () => {
            if(this.stringArr[0]=="women" || this.stringArr[0]=="men" || this.stringArr[0]=="kids"){
              let categoryArray = ["gold","silver","diamond"];
              document.querySelector("aside ul").innerHTML = categoryArray.map(element => {
                return `<li>${element}</li>
                      `
              }).join(" ");
            }else{
              let categoryArray = ["men","women","kids"];
              document.querySelector("aside ul").innerHTML = categoryArray.map(element => {
                return `<li>${element}</li>
                `
              }).join(" ");
            }
         
            let filterLiArray = document.querySelectorAll(" aside li");
            filterLiArray.forEach( li => {
              li.onclick = () =>{
                let stringArray = this.stringArr;
                let liValue = li.innerText;
                let filterCategoryArray = [];
                let filterData ;
                switch (liValue){
                  case 'Gold':
                    isFilterNested = true;
                    filterData = [(this.selectedArrayData[0])[1]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray = (this.selectedArrayData[0])[1];
                    displayFilterData(filterData);
                 
                  break;
                  case 'Silver':
                    isFilterNested = true;
                    filterData = [(this.selectedArrayData[0])[0]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray = (this.selectedArrayData[0])[0];
                    displayFilterData(filterData);
                    
                  break;
                  case 'Diamond':
                    isFilterNested = true;
                    filterData = [(this.selectedArrayData[0])[2]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray = (this.selectedArrayData[0])[2];
                    displayFilterData(filterData);
                 
                  break;
                  case 'Men':
                    filterData = [this.dsgGatherDataThroughLoop[0]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray =this.dsgGatherDataThroughLoop[0];
                    displayFilterData(filterData);
                   
                  break;
                  case 'Women':
                    filterData = [this.dsgGatherDataThroughLoop[1]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray = this.dsgGatherDataThroughLoop[1];
                    displayFilterData(filterData);
                  break;
                  case 'Kids':
                    filterData = [this.dsgGatherDataThroughLoop[2]];
                    sessionStorage.setItem("specificCategoryItems", JSON.stringify(filterData));
                    filterCategoryArray =this.dsgGatherDataThroughLoop[2];
                    displayFilterData(filterData);
                    break;
                    default:
                      console.log("none");
                }
               
                function displayFilterData(filterData){
                 
                  document.querySelector("#page-info-holder h1").innerHTML = stringArray[1];
                  document.querySelector("#page-info-holder p").innerHTML = `Home / ${stringArray[0]} /  ${stringArray[1]} / ${liValue} `;
                 document.querySelector('.mendaimond').innerHTML = filterCategoryArray.map(element => {
                      
                    return `
                             <div class="figure-div" >
                             <figure>
                             <i class="far fa-heart heart"></i>
                             <i class="fas fa-heart heart-fill"></i> 
                            
                                     <img src=${element.imagepath}>
                             <figcaption>
                               ${element.name}
                                 <br>
                                 <strong>${element.price}</strong>
                                 
                                 <div class="ratingstars">
                                     <i class="fa fa-star-o" aria-hidden="true"></i>
                                     <i class="fa fa-star-o" aria-hidden="true"></i>
                                     <i class="fa fa-star-o" aria-hidden="true"></i>
                                     <i class="fa fa-star-o" aria-hidden="true"></i>
                                     <i class="fa fa-star-o" aria-hidden="true"></i>
                                 </div>
                                 <button >Add To Cart</button>   
                             </figcaption>
                             </figure>
                             </div> `
                  });
                  allImagesDiv(filterData,filterData);
                  wishlist(filterData,filterData);
                  addToCartButton(filterData,filterData);
                }
                
              }
            });
        
          }
          asideFilterList();

          
        // wishlist event
          let wishlist = (wmkData , gsdData) => {
            let starIcons = document.querySelectorAll(".heart");
            let wishlistItems = [];
            let displayedItems = [];
            console.log(starIcons);
            starIcons.forEach( (item,index) => {
              item.onclick = () =>{
    
               let selectedItemIndex = index;
                let stringArray = this.stringArr;
                if(stringArray[0] == "women" || stringArray[0] == "men" || stringArray[0] == "kids"){
                 wmkData.forEach( element => {
                    element.forEach(element => {
                    displayedItems.push(element);
                    })
                  });
                }else{
                  gsdData.forEach( element => {
                  element.forEach(element => {
                    displayedItems.push(element);
                  })
                });
              }
               
               let wishlistSelectedItem = displayedItems.filter( (item,index) => {
                  if(index == selectedItemIndex){
                    return item;
                  }
                })
                
                addItemsToWishlist(wishlistSelectedItem[0],stringArray);
              }
            })
            function addItemsToWishlist(item ,stringArray){
             
              if(JSON.parse(localStorage.getItem("wishlistItems")) != null){
                wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
                console.log(item.category = stringArray);
                wishlistItems.push(item);
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
              }else{
               
                wishlistItems.push(item);
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
              }
              wishlistQuantityIndicator();
            
              // window.location.href = "wishlist.html";
           }
           function wishlistQuantityIndicator(){
              document.querySelector("#wishlist-quantity-indicator").innerHTML = JSON.parse(localStorage.getItem("wishlistItems")).length;
          }
          }
          wishlist(this.selectedArrayData[0] , this.dsgGatherDataThroughLoop);
        // addTocart Button events

        let addToCartButton = (wmkData ,gsdData) => {
          let allItemsDisplayed = [];
          let cartListArray = [];
          let arrayOfButtons = document.querySelectorAll(".figure-div button");
         
          arrayOfButtons.forEach((button, index) => {
            button.onclick = () => {
              let stringArray = this.stringArr;
              if(stringArray[0] == "women" || stringArray[0] == "men" || stringArray[0] == "kids"){
              
                wmkData.forEach( element => {
                  element.forEach(element => {
                    element.qty = 1;
                    element.amount = parseInt((element.price).substring(4).trim());
                    allItemsDisplayed.push(element);
                  })
                });
            }else{
              gsdData.forEach( element => {
                element.forEach(element => {
                  element.qty = 1;
                  element.amount = parseInt((element.price).substring(4).trim());
                  allItemsDisplayed.push(element);
                })
              });
            }
            console.log(allItemsDisplayed);
     
              if(JSON.parse(sessionStorage.getItem("cartItems")) != null){
                cartListArray = JSON.parse(sessionStorage.getItem("cartItems"));
                addingItemsToCart(index);
              }else{
                addingItemsToCart(index);
              }
            }
          })
          function addingItemsToCart(index){
            cartListArray.push(allItemsDisplayed[index]);
            sessionStorage.setItem("cartItems" , JSON.stringify(cartListArray));
            quantityIndicator();
          }
          function quantityIndicator(){
            // accessing cart /wishlist no of items indicator
            document.querySelector("#cart-quantity-indicator").innerHTML = JSON.parse(sessionStorage.getItem("cartItems")).length;
          }
        }
      addToCartButton(this.selectedArrayData[0] , this.dsgGatherDataThroughLoop);


     
          // page ingo related code
          
          document.querySelector("#page-info-holder h1").innerHTML = this.stringArr[1];
          document.querySelector("#page-info-holder ").innerHTML += `<p>Home / ${this.stringArr[0]} /  ${this.stringArr[1]}</p>`;
          document.title = `${this.stringArr[1]} | Jewelicious`;
          //////////////////////////
        
          
        }) 
  }
  
   
}
let categoryObject = new FetchCategoryData();
categoryObject.fetchData();






