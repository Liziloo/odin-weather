import './styles/comeau-reset.css';
import './styles/styles.css';
import { getUserLocation, getWeather } from './modules/api';

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (e) => {clickHandler(e)});

const clickHandler = (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    getWeather(location);
}

const getRandomLoc = () => {
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    return `${lat},${lng}`;
}

getUserLocation().catch(
    getWeather(getRandomLoc())
);