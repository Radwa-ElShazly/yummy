const firstName = document.querySelector('#firstName');
const firstLetter = document.querySelector('#firstLetter');

let allData = [];

firstLetter.addEventListener("keyup", async function () {
  const inputValue = this.value;
  if (inputValue.trim() !== '') {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
    let data = await response.json();
    allData = data.meals;
    // Do something with the data, for example, log it
    console.log(allData);
    displayData();

  } else {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    let data = await response.json();
    allData = data.meals;
    console.log(allData);
    displayData();
  }
  

});

firstName.addEventListener("keyup", async function () {
  const inputValue = this.value;

  // Check if inputValue is not an empty string
  if (inputValue.trim() !== '') {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    let data = await response.json();
    allData = data.meals;
    // Do something with the data, for example, log it
    console.log(allData);
    displayData();
  } else {
    // Handle the case when inputValue is an empty string
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    let data = await response.json();
    allData = data.meals;
    console.log(allData);
    displayData();
  }
});

function displayData() {
  let content = '';
  if (allData) {
    for (let i = 0; i < allData.length; i++) {
      content +=
        `
      <div class="col-lg-3 col-md-6">
        <div class="meals-content" onclick="showModalAllData(${i})">
          <img class="w-100" src="${allData[i].strMealThumb}" alt="Logo Image">
          <div class="layer-content d-flex align-items-center">
            <h3 class="fw-light">${allData[i].strMeal}</h3>
          </div>
        </div>
      </div>
      `;
    }
  } else {
    content = '<p class=" text-center text-white fs-1">No results found</p>';
  }

  document.querySelector('#search .searchContent .row').innerHTML = content;
}

function showModalAllData(index) {
  console.log(index);
  let content = `
<div class="fullPage py-5">
  <div class="container-fluid"> 
    <div class="row text-white">
      <div class="col-md-5">
        <div class="content-image text-center">
          <img class="w-100 rounded rounded-1" src="${allData[index].strMealThumb}" alt="search-imge">
          <h2 class="mt-2 fw-light">${allData[index].strMeal}</h2>
        </div>
      </div>
      <div class="col-md-7">
        <div class="recipe">
          <h3 class="fw-light">Instructions</h3>
          <p>${allData[index].strInstructions}</p>
          <div class="recipeArea d-flex">
            <h6 class="me-2">Area:</h6>
            <span>${allData[index].strArea}</span>
          </div>
          <div class="categoryArea d-flex my-2">
            <h6 class="me-2">Category: </h6>
            <span>${allData[index].strCategory}</span>
          </div>
          <h3 class="fw-light">Ingredients:</h3>
          <div class="btn-ingredient my-2">
            ${generateMealButtons(index)}
          </div>
           <div class="btn-tags my-2" id="tagsContainer">
           ${generateSearchTages(index)}
          </div>
          <a href="${allData[index].strYoutube}" class="btn btn-outline-danger mt-1">YouTube</a>
        </div>
      </div>
    </div>
  </div>
</div>`;

  document.querySelector('#search .searchContent .row').innerHTML = content;

}

function generateSearchTages(index) {
  const tagsData = allData[index].strTags;
  
  if (tagsData) {
    // If there are tags, include the heading and tag buttons
    return `
      <h3 class="fw-light mb-2">Tags:</h3>
      ${tagsData.split(',').map(tag => `<button>${tag.trim()}</button>`).join(' ')}
    `;
  } else {
    return ''; // No tags, return an empty string
  }
}

function generateMealButtons(index) {
  let buttonsMeal = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = allMeals[index][`strIngredient${i}`];
    if (ingredient !== "") {
      buttonsMeal += `<button>${ingredient}</button>`;
    }
  }
  return buttonsMeal;
}


firstName.addEventListener("keyup", function () {
  let inputValue = this.value.trim().toLowerCase();
  if (!allData) {
    allData = []
  }
  let matchinfirstNameMeals = allData.filter(meal =>
    meal.strMeal.toLowerCase().includes(inputValue)
  );
  displayData(matchinfirstNameMeals);
}
)

async function getData() {
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
  let data = await response.json();
  allData = data.meals;
}
getData();

