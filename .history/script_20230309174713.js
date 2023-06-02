'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest(); // Old school AJAX calls
// https://github.com/public-apis/public-apis    / REST Countries
request.open('GET', 'https://restcountries.com/v3.1/name/ukraine'); // Метод XMLHttpRequest.open() инициализирует новый запрос или повторно инициализирует уже созданный.
request.send(); // посылаем запрос

request.addEventListener('load', function () {
  //   console.log(this.responseText); // this- request .  Огромная строка
  const [data] = JSON.parse(this.responseText); // конвертируем и деструктурируем в объект
  console.log(data); // {name: {…}, tld: Array(2), cca2: 'UA', ccn3: '804', cca3: 'UKR', …}

  const html = `
<article class="country">
    <img class="country__img" src="" />
    <div class="country__data">
    <h3 class="country__name">COUNTRY</h3>
    <h4 class="country__region">REGION</h4>
    <p class="country__row"><span>👫</span>POP people</p>
    <p class="country__row"><span>🗣️</span>LANG</p>
    <p class="country__row"><span>💰</span>CUR</p>
    </div>
</article>
`;
});
