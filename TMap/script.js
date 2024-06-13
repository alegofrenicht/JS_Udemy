'use strict';
let counter = 1;


const form = document.querySelector('.form');
const inputDistance = document.querySelector('.form__input--distance');

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function(position){
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            const coords = [latitude, longitude];
        

        const map = L.map('map').setView(coords, 14);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on("click", function(mapEvent){
            form.classList.remove("hidden");
            inputDistance.focus();

            // console.log(mapEvent);
            // const {lat, lng} = mapEvent.latlng;
            // L.marker([lat, lng]).addTo(map)
            // .bindPopup(L.popup({
            //     maxWidth: 250,
            //     minWidth: 100,
            //     autoClose: false,
            //     closeOnClick: false,
            //     className: "running-popup",

            // }
            // )
            // )
            // .setPopupContent(`Workout ${counter}`)
            // .openPopup();
            // counter ++;
            // console.log("counter", counter);


        });
         
    },
        function(){
            alert("Could not get your position");
        }
);