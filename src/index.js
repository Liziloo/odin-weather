import './styles/comeau-reset.css';
import './styles/styles.css';

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (e) => {clickHandler(e)});

const clickHandler = (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    getWeather(location);
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
        console.log(weatherData);
        console.log(currentDescription, minTemp, maxTemp, todayDescription);
    } catch(e) {
        console.error(e.message);
    }
    
}