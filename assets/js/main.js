// Meni
const meni = document.querySelector("#mobilni-meni");
const meniLinkovi = document.querySelector(".nav-meni");

meni.addEventListener("click", function () {
  meni.classList.toggle("is-active");
  meniLinkovi.classList.toggle("active");
});

// Modal
const modal = document.getElementById("email-modal");
const openBtn = document.querySelector(".main-btn");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

//Validacija forme
const form = document.getElementById("form");
const ime = document.getElementById("ime");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordPotvrda = document.getElementById("password-potvrda");

//Error poruka
function showError(input, message) {
  const formValidation = input.parentElement;
  formValidation.className = "form-validacija error";

  const errorMessage = formValidation.querySelector("p");
  errorMessage.innerText = message;
}

//Validna poruka
function showValid(input) {
  const formValidation = input.parentElement;
  formValidation.className = "form-validacija valid";
}

//Provera polja
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} - unos neophodan`);
    } else {
      showValid(input);
    }
  });
}

//Get field name
function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//Event Listeners za formu
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([ime, email, password, passwordPotvrda]);
});
