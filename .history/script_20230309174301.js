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
  const data = JSON.parse(this.responseText); // конвертируем в
  console.log(data);
});
