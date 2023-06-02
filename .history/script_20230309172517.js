'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest(); // Old school AJAX calls
// https://github.com/public-apis/public-apis    / REST Countries
request.open('GET', 'https://restcountries.com/v3.1/name/ukraine');
request.send();
