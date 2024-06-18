'use strict';



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

    constructor(type, cords, distance, duration){
        this.type = type;
        this.cords = cords;
        this.distance = distance;
        this.duration = duration;
    }
}


class Running extends Workout {
    constructor(type, cords, distance, duration, cadence){
        super(type, cords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
};

class Cycling extends Workout {
    constructor(type, cords, distance, duration, elevGain){
        super(type, cords, distance, duration);
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
    #counter = 1;
    #map;
    #mapEvent;
    #workouts = [];

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
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        e.preventDefault();

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value; 
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;


        if (type === "running"){
            const cadence = +inputCadence.value;
            if (
                !validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Inputs have to be positive numbers!");

            workout = new Running(type, [lat, lng], distance, duration, cadence);
            }

        if (type === "cycling"){
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) 
                return alert("Inputs have to be positive numbers!");

            workout = new Cycling(type, [lat, lng], distance, duration, elevation);
            }

        this.#workouts.push(workout);
        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);

        form.classList.add("hidden");
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
    
        this.#counter ++;
    };
    _renderWorkoutMarker(workout){
        L.marker(workout.cords).addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
        }))
        .setPopupContent(`Workout ${this.#counter}`)
        .openPopup();
    };

    _renderWorkout(){
    };
};

const app = new App();