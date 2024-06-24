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
    description(){
        return `${this.type[0].toUpperCase() + this.type.slice(1)} on ${this.date.toString().slice(4,10)}`;
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


class App {
    #counter = 1;
    #map;
    #mapEvent;
    #workouts = [];

    constructor(){
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this));        
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
        form.style.display = "grid";
        inputDistance.focus();
    };

    _hideform(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add("hidden");

    }

    _toggleElevationField(e){
        e.preventDefault();
        inputCadence.closest('.form__row').classList.toggle( 'form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    };

    _moveToPopup(e){
        const workoutElement = e.target.closest(".workout");
        if(!workoutElement) return;
        const thisWorkout = this.#workouts.find(work => work.id === workoutElement.dataset.id);
        this.#map.setView(thisWorkout.cords, 14, {
            animate: true,
            pan: {
                duration: 1
            },
        });

    }

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
        this._hideform();
        this._setLocalStorage();
        
    
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
        .setPopupContent(`${workout.description()}`)
        .openPopup();
    };
    
    _renderWorkout(workout){
        const html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">"${workout.description()}"</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.type === 'running' ? workout.pace : workout.speed}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'min/km' : 'km/h'}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🦶🏼' : '⛰'}</span>
            <span class="workout__value">${workout.type === 'running' ? workout.cadence : workout.elevGain}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'spm' : 'm'}</span>
          </div>
        </li>`;

        form.insertAdjacentHTML('afterend', html);
    };
    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    };

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        this.#workouts = data;
        // this.#workouts.forEach(work => {
        //     this._renderWorkout(work);
        // });
    }

};

const app = new App();