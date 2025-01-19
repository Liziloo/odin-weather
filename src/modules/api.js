export { getUserLocation, getWeather };
import rain from '../images/rain-outline.png';
import cloudy from '../images/extra-cloudy.png';
import thunderstorm from '../images/thunder.png';
import snow from '../images/snow-outline.png';
import sunny from '../images/sunny.png';
import overcast from '../images/overcast.png';

const conditions = {
    'rain': rain,
    'cloudy': cloudy,
    'thunderstorm': thunderstorm,
    'snow': snow,
    'sunny': sunny,
    'overcast': overcast
}

const getWeather = async (location) => {
    
    const imgDiv = document.querySelector('.img');
    const locationDiv = document.querySelector('.location');
    const descripDiv = document.querySelector('.description');
    const lowDiv = document.querySelector('.low');
    const highDiv = document.querySelector('.high');
    const todayDescripDiv = document.querySelector('.today-description');

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=TQUULW4UST7ES7XPHWB4N2T5F`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        const retrievedLoc = weatherData.resolvedAddress;
        const currentDescription = weatherData.currentConditions.conditions;
        const minTemp = weatherData.days[0].tempmin;
        const maxTemp = weatherData.days[0].tempmax;
        const todayDescription = weatherData.days[0].conditions;

        locationDiv.textContent = `Location: ${retrievedLoc}`;
        descripDiv.textContent = currentDescription;
        lowDiv.textContent = minTemp;
        highDiv.textContent = maxTemp;
        todayDescripDiv.textContent = todayDescription;

        const conditionImg = document.createElement('img');
        conditionImg.src = conditions[currentDescription];
        imgDiv.appendChild(conditionImg);
    } catch(e) {
        console.error(e.message);
    }
    
}

const getUserLocation = async() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(`${position.coords.latitude},${position.coords.longitude}`)
        })
    }
}