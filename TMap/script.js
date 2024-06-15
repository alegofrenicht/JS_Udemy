'use strict';
let counter = 1;


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {
    date = new Date();
    id = (Math.random() + '').slice(10);

    constructor(cords, distance, duration){
        this.cords = cords;
        this.distance = distance;
        this.duration = duration;
    }
}


class Running extends Workout {
    constructor(cords, distance, duration, cadence){
        super(cords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
};

class Cycling extends Workout {
    constructor(cords, distance, duration, elevGain){
        super(cords, distance, duration);
        this.elevGain = elevGain;
        this.calcSpeed();
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
};

// const run = new Running([10, 15], 10, 260, 60);
// const cycl = new Cycling([10, 15], 20, 60, 500);
// console.log(run);
// console.log(cycl);

class App {
    #map;
    #mapEvent;

    constructor(){
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));        
        inputType.addEventListener('change', this._toggleElevationField);
    };
    
    _getPosition(){
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
        alert("Could not get your position");
    }
    );
};

    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];
        

        this.#map = L.map('map').setView(coords, 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
    };

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    };

    _toggleElevationField(e){
        e.preventDefault();
        inputCadence.closest('.form__row').classList.toggle( 'form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _newWorkout(e){
        e.preventDefault();
        
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
    
        }
        )
        )
        .setPopupContent(`Workout`)
        .openPopup();
    
        // counter ++;
    }
};

const app = new App();