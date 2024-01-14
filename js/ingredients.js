//https://www.themealdb.com/api/json/v1/1/list.php?i=list
let allIngredients=[];
async function getIngredients(){
  let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  let Ingredients=await response.json(); 
  allIngredients=Ingredients.meals;
  //  console.log(allIngredients);
  displayIngredients()
}
getIngredients();

function displayIngredients() {
  let content = '';
  for (let i = 0; i < allIngredients.length; i++) {
    const ingredient = allIngredients[i];
    // Check if strDescription is not null
    if (ingredient.strDescription !== null) {
      content += `<div class="col-lg-3 col-md-6">
        <div class="dishContent text-center text-white my-3" onclick="openIngredients(${i})">
          <div class="myIcon">
            <i class="fa-4x fa-solid fa-bowl-food"></i>
          </div>
          <div class="dishName">
            <h3 class="mb-2">${ingredient.strIngredient}</h3>
            <p>${ingredient.strDescription}</p>
          </div>
        </div>
      </div>`;
    }
  }
  document.querySelector('#ingredients .row').innerHTML = content;
}


async function openIngredients(index) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${allIngredients[index].strIngredient}`);
  let ingredients = await response.json();
  allIngredients = ingredients.meals;
  console.log(allIngredients);
  showIngredients();
}

function showIngredients(){
  let content='';
  for(let i=0;i<allIngredients.length;i++){
      content +=
      `<div class="col-lg-3 col-md-6">
    <div class="area-content text-center m-auto mb-3" onclick="openModalIngredients(${i})">
      <img class="w-100" src="${allIngredients[i].strMealThumb}" alt="Logo Image">
      <div class="layer-content d-flex align-items-center ">
      <h4 class="fw-light">${allIngredients[i].strMeal}</h4>
      </div>
    </div>
  </div>
    `
  }
  document.querySelector('#ingredients .row').innerHTML= content;
  }

async function openModalIngredients(index){
  let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${allIngredients[index].strMeal}`)
  let ingredient=await response.json();
  allIngredients=ingredient.meals;
  console.log(allIngredients);
  for (let index = 0; index < allIngredients.length; index++) {
      let content;
    content = `
    <div class="fullPage py-5">
      <div class="container-fluid"> 
        <div class="row text-white">
          <div class="col-lg-5 col-md-6">
            <div class="content-image text-center">
              <img class="w-100 rounded rounded-1" src="${allIngredients[index].strMealThumb}" alt="igredient-image">
              <h2 class="mt-2 fw-light">${allIngredients[index].strMeal}</h2>
            </div>
          </div>
          <div class="col-lg-7 col-md-6">
            <div class="recipe">
              <h3 class="fw-light">Instructions</h3>
              <p>${allIngredients[index].strInstructions}</p>
              <div class="recipeArea d-flex">
                <h6 class="me-2">Area:</h6>
                <span>${allIngredients[index].strArea}</span>
              </div>
              <div class="categoryArea d-flex my-2">
                <h6 class="me-2">Category: </h6>
                <span>${allIngredients[index].strCategory}</span>
              </div>
              <h3 class="fw-light">Recipes:</h3>
              <div class="btn-recipe my-2">
              ${generateRecipeButtons(index)}
              </div>
              <a href="${allIngredients[index].strSource}" class="btn btn-success">Source</a>
              <a href="${allIngredients[index].strYoutube}" class="btn btn-danger mt-1">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  
  document.querySelector('#ingredients .row').innerHTML = content;
    
  }

  }

  
function generateRecipeButtons(index) {
    let buttonIngredient = '';
    for (let i = 1; i <= 20; i++) {
      const recipeIngredient= allIngredients[index][`strMeasure${i}`];
      if (recipeIngredient !=="" && recipeIngredient !== null) {
        buttonIngredient += `<button>${recipeIngredient}</button>`;
      }
    }
    return buttonIngredient;
  }