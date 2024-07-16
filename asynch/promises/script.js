'use strict';

const imgContainer = document.querySelector('.images');

const wait = function(seconds){
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

let currentImage;

const createImage = function(imgPath){
    return new Promise(function (resolve, reject){
        const image = document.createElement('img');
        image.src = imgPath;

        image.addEventListener('load', function(){
            imgContainer.append(image);
            resolve(image)
        });
    // image.addEventListener('error', function(){
    //     reject(new Error('Image not found'));
    // });
    })};

const images = ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'];

const loadAll = async function(imgArr){
    const imgs = imgArr.map(async img =>
        const image = await createImage(img);
    });
    console.log(imgs);
};

loadAll(images);
// const loadNPause = async function(){
//     try{
//         let img = await createImage('img-1.jpg');
//         console.log('Image 1 loaded')
//         await wait(2);
//         img.style.display = 'none';
//         img = await createImage('img-2.jpg');
//         console.log('Image 2 loaded')
//         await wait(2);
//         img.style.display = 'none';
//         img = await createImage('img-3.jpg');
//         console.log('Image 3 loaded')
//         await wait(2);
//         img.style.display = 'none';
//     }catch(err){console.log(err)}
// };

// loadNPause();




// createImage('img-1.jpg').then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img-2.jpg').then(img => {
//         currentImage = img;
//         console.log('Image 2 loaded')})
// }).then(img => {
//     return wait(2)
// }).then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img-3.jpg').then(img => {
//         currentImage = img;
//         console.log('Image 3 loaded')})
// }).then(img => {
//     return wait(2)}).then(() => currentImage.style.display = 'none')
// .catch(err => {
//     console.log(err);
//     alert(err)})


// const countriesContainer = document.querySelector('.countries');

// const renderCountry= function(data, className = ''){
//     const html = `
//             <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}m people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//             </article>`
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = '1';
// };

// const getPosition = function(){
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// }

// const whereAmI = async function(){
//     try{
//         const pos = await getPosition();
//         const coords = [pos.coords.latitude, pos.coords.longitude];
//         const resGeoCOde = await fetch(`https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json&auth=147952128638216e15983197x79809`);
//         const data1 = await resGeoCOde.json();
//         const resRestcountries = await fetch(`https://restcountries.com/v2/name/${data1.country}`);
//         const data2 = await resRestcountries.json();
//         renderCountry(data2[0]);
//         return `You are in ${data1.city}, ${data1.country}`
//     } catch(err){
//         console.error(err);
//     }
// };

// const getJSON = function(url, errorMsg = "Something went wrong"){
//     return fetch(url).then((response) => {
//         if(!response.ok)
//             throw new Error(`${errorMsg} (${response.status})`);
//         // console.log(response.json())
//         return response.json();
//         });
// };

// const timeout = function(sec){
//     return new Promise(function(_, reject){
//         setTimeout(function(){
//             reject(new Error('Request took too long!'))
//         }, sec * 1000)
//     })
// }

// Promise.race([
//     getJSON(`https://restcountries.com/v2/name/israel`),
//     timeout(0.2)
// ]).then(res => console.log(res[0]))


// Promise.any([
//     Promise.resolve('Success'),
//     Promise.reject('ERROR'),
//     Promise.resolve('Success 2')
// ]).then(res => console.log(res)).catch(err => console.error(err))