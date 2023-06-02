'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data) {
  const html = `
<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
</article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest(); // 1. Создать XMLHttpRequest.  Old school AJAX calls
  // https://github.com/public-apis/public-apis    / REST Countries
  request.open('GET', `https://restcountries.com/v2/name/${country}`); // 2. Инициализировать(конфигурировать) запрос. Метод XMLHttpRequest.open() инициализирует новый запрос или повторно инициализирует уже созданный.
  request.send(); // 3. посылаем запрос

  request.addEventListener('load', function () {
    // 4. Слушать события на request, чтобы получить ответ.
    //   console.log(this.responseText); // this- request .  Огромная строка
    const [data] = JSON.parse(this.responseText); // конвертируем и деструктурируем в объект
    console.log(data); // {name: {…}, tld: Array(2), cca2: 'UA', ccn3: '804', cca3: 'UKR', …}

    // Render country 1
    renderCountry(data);

    // Получаем соседние государства (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest(); // Old school AJAX calls
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // конфигурирует запрос/ https://restcountries.com/v3.1/alpha/{code}
    request2.send(); // посылаем запрос

    request2.addEventListener('load', function () {
      console.log(this.responseText);
    });
  });
};

getCountryAndNeighbor('portugal');
