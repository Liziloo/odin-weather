import './styles/comeau-reset.css';
import './styles/styles.css';

const imgDiv = document.querySelector('.img');
const descripDiv = document.querySelector('.description');
const lowDiv = document.querySelector('.low');
const highDiv = document.querySelector('.high');
const todayDescripDiv = document.querySelector('.today-description');

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (e) => {clickHandler(e)});

const clickHandler = (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    getWeather(location);
}

const getUserLocation = async() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            getWeather(`${position.coords.latitude},${position.coords.longitude}`)
        })
    }
}

const getWeather = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=TQUULW4UST7ES7XPHWB4N2T5F`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        const currentDescription = weatherData.currentConditions.conditions;
        const minTemp = weatherData.days[0].tempmin;
        const maxTemp = weatherData.days[0].tempmax;
        const todayDescription = weatherData.days[0].conditions;

        descripDiv.textContent = currentDescription;
        lowDiv.textContent = minTemp;
        highDiv.textContent = maxTemp;
        todayDescripDiv.textContent = todayDescription;
    } catch(e) {
        console.error(e.message);
    }
    
}

const getRandomLoc = () => {
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    return `${lat},${lng}`;
}

getUserLocation().catch(
    getWeather(getRandomLoc())
);