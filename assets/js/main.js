const meni = document.querySelector("#mobilni-meni");
const meniLinkovi = document.querySelector(".nav-meni");

meni.addEventListener("click", function () {
  meni.classList.toggle("is-active");
  meniLinkovi.classList.toggle("active");
});
