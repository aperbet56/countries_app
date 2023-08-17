// Recupération des différents éléments
const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table__result");
const btn = document.querySelector(".btn");

// Création de la variable countries qui va stocker les données de l'API dans un tableau
let countries = [];

// Fonction asynchrone getCountries qui va permettre de récupérer les données de l'API
const getCountries = async () => {
  await fetch(" https://restcountries.com/v3.1/all")
    .then((blob) => blob.json())
    .then((data) => countries.push(...data));
  window.scrollTo(0, 0);

  countries = orderList(); // appel de la fonction orderList
  console.log(countries);

  // Appel de la fonction createCountryList
  createCountryList(countries);
};

// Appel de la fonction getCountries
getCountries();

// Fonction orderList afin de trier les noms de pays par ordre alphabétique
const orderList = () => {
  const orderedData = countries.sort((a, b) => {
    // a est inférieur à b
    if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
      return -1;

      //a est supérieur à b
    } else if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
      return 1;

      // a égal à b
    } else {
      return 0;
    }
  });
  return orderedData;
};

// Fonction createCountryList ayant pour paramètre countriesList pour créer la liste de tous nos éléments et les injecter dans le DOM
const createCountryList = (countriesList) => {
  countriesList.forEach((country) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table__item");
    listItem.innerHTML = `<div class="container__img">
    <img src="${country.flags.svg}" alt="${country.flags.alt}" />
    <p class="name">${country.name.common}</p>
    </div>
    <p class="capital">${country.capital}</p>
    <p class="population">${country.population}</p>`;
    searchResult.appendChild(listItem);
  });
};

// Fonction filterData qui va permettre de filter les données
const filterData = (e) => {
  searchResult.textContent = "";

  const searchedString = e.target.value.toLowerCase();

  const filteredArr = countries.filter((el) =>
    el.name.common.toLowerCase().includes(searchedString)
  );

  // Appel de la fonction createCountryList ayant pour paramètre filteredArr
  createCountryList(filteredArr);
};

// Ecoute de l'événement input (c'est-à-dire dès que l'utilisateur va écrire à l'intérieur du champ) et appel de la fonction filterData
searchInput.addEventListener("input", filterData);

// Ecoute de l'événement click sur la flèche
btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
