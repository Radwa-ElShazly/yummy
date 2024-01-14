// https://www.themealdb.com/api.php?fbclid=IwAR3YSjdYDOJUSPo1T_m2TyDAPs1KtY9dSM8eE3SdyvbFNoF_jPBBEPb-JDg
$(document).ready(function () {
  let listUnstyled = $('.list-unstyled');
  let sideNavMenu = $('.side-nav-menu');

  function hideSideNavMenu() {
    sideNavMenu.animate({ left: '-220px' }, 500);
    listUnstyled.animate({ top: '100%' }, 1000);
    $('i.fa-bars').removeClass('fa-times');
  }

  $('i.fa-bars').click(function () {
    $(this).toggleClass('fa-times');
    if (sideNavMenu.css('left') === '0px') {
      hideSideNavMenu();
    } else {
      sideNavMenu.animate({ left: '0px' }, 500);
      listUnstyled.animate({ top: '0px' }, 1000);
    }
  });

  $("#menu li a").on('click', function () {
    hideSideNavMenu();
    let page = $(this).data('page');
    $('#pages .page').addClass('hide');
    $('#pages .page[data-page="' + page + '"]').removeClass('hide');
  });
});


let allMeals=[];
async function getMeals(){
  let response=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
  let meals=await response.json(); 
  allMeals=meals.meals;
  console.log(allMeals);
  displayMeals()
}
getMeals();

function displayMeals(){
let content='';
for(let i=0 ;i<allMeals.length;i++){
    content +=
    ` <div class="col-lg-3 col-md-6">
    <div class="meals-content" onclick="openModalMeals(${i})">
      <img class="w-100" src="${allMeals[i].strMealThumb}" alt="imageMeal">
      <div class="layer-content d-flex align-items-center">
        <h3 class="fw-light">${allMeals[i].strMeal}</h3>
      </div>
    </div>
  </div>
    `
}

document.querySelector('#meals .row').innerHTML=content;
}

function openModalMeals(index) {
  let content = `
    <div class="fullPage py-5">
      <div class="container-fluid"> 
        <div class="row text-white">
          <div class="col-lg-5 col-md-6">
            <div class="content-image text-center">
              <img class="w-100 rounded rounded-1" src="${allMeals[index].strMealThumb}" alt="imageMeal">
              <h2 class="mt-2 fw-light">${allMeals[index].strMeal}</h2>
            </div>
          </div>
          <div class="col-lg-7 col-md-6">
            <div class="recipe">
              <h3 class="fw-light">Instructions</h3>
              <p>${allMeals[index].strInstructions}</p>
              <div class="recipeArea d-flex">
                <h6 class="me-2">Area:</h6>
                <span>${allMeals[index].strArea}</span>
              </div>
              <div class="categoryArea d-flex my-2">
                <h6 class="me-2">Category: </h6>
                <span>${allMeals[index].strCategory}</span>
              </div>
              <h3 class="fw-light">Ingredients:</h3>
              <div class="btn-ingredient my-2">
                ${generateDataButtons(index)}
              </div>
              <div class="btn-tags my-2" id="tagsContainer">
                ${generateTages(index)}
              </div>
              <a href="${allMeals[index].strYoutube}" class="btn btn-outline-danger mt-1 ms-1">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.querySelector('#meals .row').innerHTML = content;
}


function generateDataButtons(index) {
  let buttonsMeal = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = allMeals[index][`strIngredient${i}`];
    if (ingredient !=="") {
      buttonsMeal += `<button>${ingredient}</button>`;
    }
  }
  return buttonsMeal;
}

function generateTages(index) {
  const tags = allMeals[index].strTags;
  
  if (tags) {
    // If there are tags, include the heading and tag buttons
    const tagButtons = `
      <h3 class="fw-light mb-2">Tags:</h3>
      ${tags.split(',').map(tag => `<button>${tag.trim()}</button>`).join(' ')}
    `;
    return tagButtons;
  } else {
    return ''; // No tags, return an empty string
  }
}


function loadScreen(){
  $('.loading-container').fadeOut(2000);
  $('section,html').css('overflow-y','visible')
}
loadScreen();

