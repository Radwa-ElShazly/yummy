// https://www.themealdb.com/api/json/v1/1/list.php?a=list
let allAreas=[];
async function getAreas(){
  let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  let Areas=await response.json(); 
  allAreas=Areas.meals;
  // console.log(allAreas);
  displayAreas()
}
getAreas();


function displayAreas(){
  
let content='';
for(let i=0;i<allAreas.length;i++){
    content +=`
    <div class="col-lg-3 col-md-6">
    <div class="area-content text-center m-auto mb-3" onclick="openArea(${i})">
      <div class="myIcon">
      <i class="fa-5x fa-solid fa-city text-danger mb-2"></i>
      </div>
      <div class="name-conuntry">
      <h4 class="bg-transparent text-white">${allAreas[i].strArea}</h4>
      </div>
    </div>
  </div>
    `
}
document.querySelector('#area .row').innerHTML=content;
}

async function openArea(index){
  
let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${allAreas[index].strArea}`);
let areas=await response.json();
allAreas= areas.meals;
// console.log(allAreas);
showAreas();
}

function showAreas(){
  let content='';
  for(let i=0;i<allAreas.length;i++){
      content +=
      `<div class="col-lg-3">
    <div class="area-content text-center m-auto mb-3" onclick="detailsAllArea(${i})">
      <img class="w-100" src="${allAreas[i].strMealThumb}" alt="image-area">
      <div class="layer-content d-flex align-items-center ">
      <h4 class="fw-light">${allAreas[i].strMeal}</h4>
      </div>
    </div>
  </div>
    `
  }
  document.querySelector('#area .row').innerHTML= content;
  }

async function detailsAllArea(myIndex) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${allAreas[myIndex].strMeal}`);
   let areas = await response.json();
   allAreas = areas.meals;
  //  console.log(allAreas);

   for (let myIndex = 0; myIndex <allAreas.length; myIndex++) {
       let content;
   content = `
   <div class="fullPage py-5">
     <div class="container-fluid"> 
       <div class="row text-white">
         <div class="col-lg-5 col-md-6">
           <div class="content-image text-center">
             <img class="w-100 rounded rounded-1" src="${allAreas[myIndex].strMealThumb}" alt="image-area">
             <h2 class="mt-2 fw-light">${allAreas[myIndex].strMeal}</h2>
           </div>
         </div>
         <div class="col-lg-7 col-md-6">
           <div class="recipe">
             <h3 class="fw-light">Instructions</h3>
             <p>${allAreas[myIndex].strInstructions}</p>
             <div class="recipeArea d-flex">
               <h6 class="me-2">Area:</h6>
               <span>${allAreas[myIndex].strArea}</span>
             </div>
             <div class="categoryArea d-flex my-2">
               <h6 class="me-2">Category: </h6>
               <span>${allAreas[myIndex].strCategory}</span>
             </div>
             <h3 class="fw-light">Ingredients:</h3>
             <div class="btn-recipe my-2">
             ${generateRecipeAreaButtons(myIndex)}
             </div>
             <a href="${allIngredients[myIndex].strSource}" class="btn btn-success">Source</a>
             <a href="${allAreas[myIndex].strYoutube}" class="btn btn-danger mt-1">YouTube</a>
           </div>
         </div>
       </div>
     </div>
   </div>`;
 document.querySelector('#area .row').innerHTML = content;
   }

 }


 function generateRecipeAreaButtons(myIndex) {
  let buttonArea = '';
  for (let i = 1; i <= 20; i++) {
    const recipeArea= allAreas[myIndex][`strMeasure${i}`];
    if (recipeArea !=="" && recipeArea !== null) {
      buttonArea += `<button>${recipeArea}</button>`;
    }
  }
  return buttonArea;
}