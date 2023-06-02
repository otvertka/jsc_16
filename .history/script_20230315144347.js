'use strict';
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
///////////////////////////////////////////////xxxxxxxxxxxxxxxxxxxx///////////////////////xxxxxxxxxxxxxxxxxxxxxxx///////////////x
// fetch('https://restcountries.com/v3.1/name/portugal').then(data =>
//   data.json().then(data => console.log(data[0]))
// );

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  console.log(data);
  const html = `
<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены), и управление будет передано в первый блок catch в стеке вызовов. Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       console.log(neighbour);

//       if (!neighbour) throw new Error('Нет соседей(');
//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// getCountryData('australia');

// CHALLENGE # 1  .  TEST COORD: 52.508, 13.381;  19.037, 72.873;   -33.933, 18.474   https://geocode.xyz/${lat},${lng}?geoit=json&auth=232532456825710686009x81421
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=232532456825710686009x81421`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       const country = data.country;
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       // console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`${err.message}💥💥💥`);
//     });
// };

// whereAmI(52.508, 11.0022);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// LECT  The Event Loop in Practice
// console.log('Test start');  // 1
// setTimeout(() => console.log('0 sec timer'), 0);  // 3
// Promise.resolve('Resolved promise 1').then(res => console.log(res));  // 2
// console.log('Test end');  // 2
///

// console.log('Test start'); // 1
// setTimeout(() => console.log('0 sec timer'), 0); // 4
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 2

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// }); // 3
// console.log('Test end'); // 2

///////
// // LECT Building a Simple Promise
// const loteryPromise = new Promise(function (resolve, reject) {
//   console.log('Скоро узнаем результат лотереи🪀');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 🏆');
//     } else {
//       reject(new Error('You LOOSE 🎃'));
//     }
//   }, 2000);
// });
// loteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(1)
//   .then(() => {
//     console.log('1 секунда прошла');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 секунда прошла');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 секунда прошла');
//     return wait(1);
//   })
//   .then(() => console.log('4 секунда прошла'));

// // setTimeout(() => {
// //   console.log('1 секунда прошла');
// //   setTimeout(() => {
// //     console.log('2 секунда прошла');
// //     setTimeout(() => {
// //       console.log('3 секунда прошла');
// //       setTimeout(() => {
// //         console.log('4 секунда прошла');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// LECT Promisifying the Geolocation API

// console.log('Поучаем позицию');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));
//
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=232532456825710686009x81421`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       const country = data.country;
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       // console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`${err.message}💥💥💥`);
//     });
// };

// btn.addEventListener('click', whereAmI);

// LECT Consuming Promises with Async/Await
const whereAmI = async function (country) {
  // fetch(`https://restcountries.com/v2/name/${country}`).then(res => {
  //   console.log(res);
  // }); // аналогично

  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
// whereAmI('portugal');
whereAmI('ukraine');
console.log('FIRST');
//////////////////////

// CHALLENGE # 2
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg; // создаём глобальную переменную
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none'; // скоываем изображение
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// request2.addEventListener('load', function () {
//   //       const data2 = JSON.parse(this.responseText);
//   //       console.log(data2);

/// БЕЗ THROW
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`) //   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       // throw
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены), и управление будет передано в первый блок catch в стеке вызовов. Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.

//       return response.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dsadasdasd';
//       // console.log(neighbour);
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       // throw
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`); // Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом выполнение текущей функции будет остановлено (инструкции после throw не будут выполнены), и управление будет передано в первый блок catch в стеке вызовов. Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('spain');
// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(response => response.json())
// //     .then(data => renderCountry(data[0]));
// // };
// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });
// // getCountryData('australia');
///////////////////////////////////////////////xxxxxxxxxxxxxxxxxxxx///////////////////////xxxxxxxxxxxxxxxxxxxxxxx///////////////x
// VLADILEN
// console.log('Запрос данных...');
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

// const sleep = ms => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), ms);
//   });
// };

// // sleep(2000).then(() => console.log('After 2 sec'));
// // sleep(3000).then(() => console.log('After 3 sec'));

// Promise.all([sleep(2000), sleep(5000)]).then(() => {
//   console.log('All promises');
// }); // Выполнится когда все промисы завершатся (через 5 секун)

// Promise.race([sleep(2000), sleep(5000)]).then(() => {
//   console.log('Race promises'); // ВЫполнится сразу, когда 1й промис отработает
// });

// const delay = ms => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), ms);
//   });
// };
// const url = 'https://jsonplaceholder.typicode.com/todos';

// function fetchTodos() {
//   console.log('Fetch todo started...');
//   return delay(2000)
//     .then(() => fetch(url))
//     .then(response => response.json());
// }

// fetchTodos()
//   .then(data => {
//     console.log('Data:', data);
//   })
//   .catch(e => console.log(e));

// async function fetchAsyncTodos() {
//   console.log('Fetch todo started...');
//   try {
//     await delay(2000);
//     const response = await fetch(url);
//     const data = response.json();
//     console.log('Data:', data);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log('finally');
//   }
// }

// fetchAsyncTodos();

///
// fetch('http://getpost.itgid.info/index2.php').then(data => {
//   console.log(data);
// });
