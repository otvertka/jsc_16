'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
<article class="country ${className}">
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

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest(); // 1. Создать XMLHttpRequest.  Old school AJAX calls
//   // https://github.com/public-apis/public-apis    / REST Countries
//   request.open('GET', `https://restcountries.com/v2/name/${country}`); // 2. Инициализировать(конфигурировать) запрос. Метод XMLHttpRequest.open() инициализирует новый запрос или повторно инициализирует уже созданный.
//   request.send(); // 3. посылаем запрос

//   // 4. Слушать события на request, чтобы получить ответ.Три наиболее используемых события: load;error; progress.
//   // load -когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.; error- когда запрос не может быть выполнен, например, нет соединения или невалидный URL.; progress- происходит периодически во время загрузки ответа, сообщает о прогрессе.
//   request.addEventListener('load', function () {
//     //   console.log(this.responseText); // this- request .  Огромная строка
//     const [data] = JSON.parse(this.responseText); // Тело ответа сервера. конвертируем и деструктурируем в объект

//     console.log(data); // {name: {…}, tld: Array(2), cca2: 'UA', ccn3: '804', cca3: 'UKR', …}

//     // Render country 1
//     renderCountry(data);

//     // Получаем соседние государства (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest(); // Old school AJAX calls
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // конфигурирует запрос/ https://restcountries.com/v3.1/alpha/{code}
//     request2.send(); // посылаем запрос

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// setTimeout(() => {
//   console.log('1 секунда прошла');
//   setTimeout(() => {
//     console.log('2 секунда прошла');
//     setTimeout(() => {
//       console.log('3 секунда прошла');
//       setTimeout(() => {
//         console.log('4 секунда прошла');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
// getCountryData('portugal');

console.log('Запрос данных...');
// setTimeout(() => {
//   console.log('Подготовка данных...');

//   const backendData = {
//     server: 'aws',
//     port: 2000,
//     status: 'working',
//   };

//   setTimeout(() => {
//     backendData.modified = true;
//     console.log('Данные получено', backendData);
//   });
// }, 2000);

// const p = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     console.log('Подготовка данных...');

//     const backendData = {
//       server: 'aws',
//       port: 2000,
//       status: 'working',
//     };
//     resolve(backendData); // результат успешной операции
//   }, 2000);
// });

// // then вызовется когда закончится асинхронная операция (resolve)
// p.then(data => {
//   // когда промис выполнится мы делаем следующую асинхронную операцию
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       data.modified = true;
//       resolve(data);
//     }, 2000);
//   });
// })

//   .then(clientData => {
//     console.log('Данные получено', clientData);
//     clientData.fromPromise = true;
//     return clientData;
//   })
//   .then(data => {
//     console.log('Modified', data);
//   })
//   .catch(err => {
//     console.log('Ошибка:', err);
//   })
//   .finally(() => console.log('Finally'));

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

// sleep(2000).then(() => console.log('After 2 sec'));
// sleep(3000).then(() => console.log('After 3 sec'));

Promise.all([sleep(2000), sleep(5000)]).then(() => {
  console.log('All promises');
}); // Выполнится когда все промисы завершатся (через 5 секун)
