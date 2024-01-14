let allcategories=[];
async function getCategories(){
  let response=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  let categories=await response.json(); 
  allcategories=categories.categories;
  // console.log(allcategories);
  displayCategories()
}
getCategories();

function displayCategories(){

let content='';
for(let i=0; i < allcategories.length;i++){
    content +=
    ` <div class="col-lg-3 col-md-6">
    <div class="meals-content" onclick="openCategories(${i})">
    <img class="w-100" src="${allcategories[i].strCategoryThumb}" alt="image-category">
      <div class="layer-content d-flex flex-column">
        <h4>${allcategories[i].strCategory}</h4>
        <p>${allcategories[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>
  
  `
}
document.querySelector('#categories .row').innerHTML=content;
}


async function openCategories(index){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${allcategories[index].strCategory}`);
  let categories = await response.json();
  allcategories = categories.meals;
  // console.log(allcategories);
  showCategories();
  }

  function showCategories(){
    let content='';
    for(let i=0;i<allcategories.length;i++){
        content +=
        ` <div class="col-lg-3 col-md-6">
        <div class="meals-content" onclick="openModalCategory(${i})">
        <img class="w-100" src="${allcategories[i].strMealThumb}" alt="image-category">
          <div class="layer-content d-flex align-items-center">
            <h4 class="fw-light">${allcategories[i].strMeal}</h4>
          </div>
        </div>
      </div>
      
      `
    }
    document.querySelector('#categories .row').innerHTML=content;
  }


async function openModalCategory(index){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${allcategories[index].strMeal}`)
  let category=await response.json();
  allcategories=category.meals;
  console.log(allcategories);
  
  for (let index = 0; index < allcategories.length; index++) {
    let content;
        content = `
      <div class="fullPage py-5">
        <div class="container-fluid"> 
          <div class="row text-white">
            <div class="col-lg-5 col-md-6">
              <div class="content-image text-center">
                <img class="w-100 rounded rounded-1" src="${allcategories[index].strMealThumb}" alt="image-category">
                <h2 class="mt-2 fw-light">${allcategories[index].strMeal}</h2>
              </div>
            </div>
            <div class="col-lg-7 col-md-6">
              <div class="recipe">
                <h3 class="fw-light">Instructions</h3>
                <p>${allcategories[index].strInstructions}</p>
                <div class="recipeArea d-flex">
                  <h6 class="me-2">Area:</h6>
                  <span>${allcategories[index].strArea}</span>
                </div>
                <div class="categoryArea d-flex my-2">
                  <h6 class="me-2">Category: </h6>
                  <span>${allcategories[index].strCategory}</span>
                </div>
                <h3 class="fw-light">Recipes :</h3>
                <div class="btn-recipe my-2">
                ${generateRecipeIngredientsButtons(index)}
                </div>
                <a href="${allcategories[index].strSource}" class="btn btn-success">Source</a>
                <a href="${allcategories[index].strYoutube}" class="btn btn-danger">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  
  document.querySelector('#categories .row').innerHTML = content;
    
  }

  }

  function generateRecipeIngredientsButtons(index) {
    let buttonRecipeIngredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = allcategories[index][`strIngredient${i}`];
        if (ingredient !== "" && ingredient !== null ) {
            buttonRecipeIngredients += `<button>${ingredient}</button>`;
        }
    }
    return buttonRecipeIngredients;
}
