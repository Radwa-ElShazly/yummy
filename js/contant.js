// declaration
let userName=document.querySelector("#name");
let userPhone=document.querySelector("#number");
let userPassword=document.querySelector("#password");
let userEmail=document.querySelector("#email");
let userAge=document.querySelector("#age");
let userRepassword=document.querySelector("#repassword");
let submit=document.querySelector("#submit");
let allUsers=[];

// regex    
const usernameRegex =/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
const regexPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const regexPhone=/^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,4}[-\s]?\d{1,9}$/;
const patternEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const patternAge=/^(?:[1-9][0-9]?|1[01][0-9]|150)$/;



document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
});

function setLocalStorge(){
    localStorage.setItem("users",JSON.stringify(allUsers));
}

if (localStorage.getItem("users")!=null){
  allUsers= JSON.parse(localStorage.getItem("users"))
}

submit.addEventListener("click", function() {
    const error = document.querySelector("#error");
    const success = document.querySelector("#success");
    if (usernameRegex.test(userName.value) && regexPhone.test(userPhone.value) && regexPassword.test(userPassword.value) && patternEmail.test(userEmail.value)&& patternAge.test(userAge.value)&&userRepassword.value===userPassword.value) {
        let user = {
            name: userName.value,
            number:userPhone.value,
            password:userPassword.value,
            email:userEmail.value,
            age:userAge.value,
            repassword:userRepassword.value,
        };
        allUsers.push(user);
        console.log(allUsers);
        // save the updated user to localStorage
        setLocalStorge();
        clearForm();
        displaySubmit();
        success.classList.remove("d-none");
        success.classList.add("d-block");
        error.classList.remove("d-block");
        error.classList.add("d-none"); 
        
    }
    else{
        error.classList.remove("d-none");
        error.classList.add("d-block"); 
        success.classList.remove("d-block");
        success.classList.add("d-none");
    }

});


function clearForm(){
   userName.value='';
   userPhone.value='';
   userPassword.value='';
   userEmail.value='';
   userAge.value='';
   userRepassword.value='';
}

userName.addEventListener("keyup", function() {
    const nameError = document.querySelector(".nameError");
    if (!usernameRegex.test(userName.value)) {
        nameError.classList.remove("d-none");
        nameError.classList.add("d-block");
        return false;
    } else {
        nameError.classList.remove("d-block");
        nameError.classList.add("d-none");
        return true;
    }
});

userPhone.addEventListener("keyup",function(){
    const phoneError= document.querySelector(".phoneError");
    if(!userPhone.value.match(regexPhone)){
        phoneError.classList.remove("d-none");
        phoneError.classList.add("d-block"); 
        return false;
    }else{
        phoneError.classList.remove("d-block");
        phoneError.classList.add("d-none");
        return true;
    }
})

userPassword.addEventListener("keyup",function(){
const passwordError=document.querySelector(".passwordError");

if (!userPassword.value.match(regexPassword)) {
    passwordError.classList.add("d-block");
    passwordError.classList.remove("d-none");
    return false;
}else{
    passwordError.classList.add("d-none");
    passwordError.classList.remove("d-block");
    return true;
}
})

userEmail.addEventListener("keyup",function(){
const emailError=document.querySelector(".emailError");
if(!userEmail.value.match(patternEmail)){
    emailError.classList.remove("d-none");
    emailError.classList.add("d-block");
    return false;

}else{
    emailError.classList.remove("d-block");
    emailError.classList.add("d-none"); 
    return true
}
})

userAge.addEventListener("keyup",function(){
const ageError=document.querySelector(".ageError");
if(!patternAge.test(userAge.value)){
    ageError.classList.add('d-block');
    ageError.classList.remove('d-none');
    return false;
}else{
    ageError.classList.add('d-none');
    ageError.classList.remove('d-block');
    return true;
}
})

userRepassword.addEventListener("keyup",function(){
const repasswordError=document.querySelector(".repasswordError");
if(userRepassword.value==userPassword.value){
    repasswordError.classList.add("d-none");
    repasswordError.classList.remove("d-block");
    return true;
}else{
    repasswordError.classList.add("d-block");
    repasswordError.classList.remove("d-none");
    return false;
}
})

// Submit Successfully
function displaySubmit(){
    let cartoona='';
    cartoona +=`
    <div class="fullPage py-5">
    <form class="m-auto px-5">
    <div class="container w-75 dvh-100 px-5">
      <div class="title-contact text-center text-white mt-5 py-4">
          <h1 class="bg-transparent">Contact Us</h1>
      </div>
     <h2 class="text-success text-center mt-5">Submit Successfully</h2>
    </div>
    </form>
  </div>`
  document.querySelector("#contact").innerHTML=cartoona;
}