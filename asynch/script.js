'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputLat = document.querySelector('.form__label--lat');
const inputLng = document.querySelector('.form__label--lng');

let country;


const getJSON = function(url, errorMsg = "Something went wrong"){
    return fetch(url).then((response) => {
        if(!response.ok)
            throw new Error(`${errorMsg} (${response.status})`);
        // console.log(response.json())
        return response.json();
        });
};


const getCountryData = function(country){
    getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour) throw new Error("No neighbour found");
        
        return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, "Country not found");
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.log(err);
            alert(err)
        })
        .finally(() => {
            console.log('finally');
        })
}
const whereAmI = function(lat, lng){
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=147952128638216e15983197x79809`)
    .then(response => {
        if(!response.ok) throw new Error(`Sometihng went wrong ${response.status})`)
        return response.json()})
    .then(data => {
        if(!data.country) throw new Error(`Country not found`);
        return data.country})
    .then(data => {
        getCountryData(data);
    })
    .catch(err => alert(err));
};

btn.addEventListener('click', function(){
    btn.style.display = 'none';
    whereAmI(52.508, 13.381);
    
});




const renderCountry= function(data, className = ''){
    const html = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}m people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>`
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = '1';
};


// const getCountryAndNeighbour = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}
//     `);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         renderCountry(data);

//         const neighbour = data.borders?.[0];
//         if(!neighbour) return;
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}
//             `);
//         request2.send();
//         request2.addEventListener('load', function(){
//             const data2 = JSON.parse(this.responseText);
//             console.log('data2', data2)
//             renderCountry(data2, 'neighbour');
//         })
//     });
// }

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('israel');
// getCountryAndNeighbour('russia');
// getCountryAndNeighbour('china');
// getCountryAndNeighbour('maldives');

// https://countries-api-836d.onrender.com/countries/





// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then((response) => {
//             if(!response.ok)
//                 throw new Error(`Country not found (${response.status})`)

//             return response.json();
//         })
//         .then((data) => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders?.[0];

//             if(!neighbour) return;
//             return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.log(err);
//             alert(err)
//         })
//         .finally(() => {
//             console.log('finally');
//         })
// }

