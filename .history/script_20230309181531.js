'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // Old school AJAX calls
  // https://github.com/public-apis/public-apis    / REST Countries
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // Метод XMLHttpRequest.open() инициализирует новый запрос или повторно инициализирует уже созданный.
  request.send(); // посылаем запрос

  request.addEventListener('load', function () {
    //   console.log(this.responseText); // this- request .  Огромная строка
    const [data] = JSON.parse(this.responseText); // конвертируем и деструктурируем в объект
    console.log(data); // {name: {…}, tld: Array(2), cca2: 'UA', ccn3: '804', cca3: 'UKR', …}

    const html = `
<article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
    <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
    </div>
</article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
