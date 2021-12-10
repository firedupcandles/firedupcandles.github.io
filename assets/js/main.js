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
  signUpError();
}

//Validna poruka
function showValid(input) {
  const formValidation = input.parentElement;
  formValidation.className = "form-validacija valid";
  signUpValid();
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

//Provera duzine polja
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} mora da sadrži minimum ${min} karaktera`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} mora da sadrži manje od ${max} karaktera`
    );
  } else {
    showValid(input);
  }
}

//Provera poklapanja password-a
function passwordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password se ne poklapa");
  }
}

//Hvatanje imena polja
function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//Event Listeners za formu
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([ime, email, password, passwordPotvrda]);
  checkLength(ime, 3, 30);
  checkLength(password, 8, 25);
  checkLength(passwordPotvrda, 8, 25);
  passwordMatch(password, passwordPotvrda);
});

//Obavestenje o prijavi
function signUpValid() {
  const modalBtn = document.querySelector(".modal-input-btn");
  const uspesnaPrijava = document.querySelector(".uspesna-prijava");
  modalBtn.addEventListener("click", () => {
    uspesnaPrijava.style.display = "block";
  });
}
function signUpError() {
  const modalBtn = document.querySelector(".modal-input-btn");
  const uspesnaPrijava = document.querySelector(".uspesna-prijava");
  modalBtn.addEventListener("click", () => {
    uspesnaPrijava.style.display = "none";
  });
}

//Galerija
let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  galleryImages.forEach(function (image, index) {
    image.onclick = function () {
      let getElementCss = window.getComputedStyle(image);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImgUrlPos = getFullImgUrl.split("/assets/images/");
      let setNewImgUrl = getImgUrlPos[1].replace('")', "");

      getLatestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onClick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "assets/images/" + setNewImgUrl);
      newImg.setAttribute("id", "current-img");

      newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Sledeća");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onClick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prethodna");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onClick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
      };
    };
  });
}
function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (changeDir === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (changeDir === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", "assets/images/img" + calcNewImg + ".jpg");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImg = calcNewImg;
}

//Alert za dostavu
function showAlert() {
  var dostava =
    "Radimo na tome da omogućimo online poručivanje. Za sada, dostava nije moguća.";
  alert(dostava);
}
