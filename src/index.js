import './styles/comeau-reset.css';
import './styles/styles.css';


const getWeather = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=TQUULW4UST7ES7XPHWB4N2T5F`;
    try {
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
    } catch(e) {
        alert(e);
    }
    
}

getWeather(45231);