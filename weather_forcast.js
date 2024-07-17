const weather = document.querySelector(".weather");
const cityinput = document.querySelector(".cityinput");
const displays = document.querySelector(".displays");
const apikey = "0e8bc2e62fbb36a260a940f43a707787";

weather.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityinput.value;

    if(city){
        try{
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
        }
        catch{
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Try Again")
    }
});

async function getWeatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
} 

function displayWeatherInfo(data){
    const {name: city,
           main: {temp, humidity}, 
           weather: [{description}]} = data;
    
    displays.textContent = "";
    displays.style.display = "flex";

    const cityD = document.createElement("h1")
    const temperatureD = document.createElement("p");
    const humidityD = document.createElement("p");
    const descriptionD = document.createElement("p");
    
    cityD.textContent = city;
    temperatureD.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityD.textContent = `Humidity: ${humidity}%`;
    descriptionD.textContent = description;

    temperatureD.classList.add("temperatureD");
    humidityD.classList.add("humidityD");
    descriptionD.classList.add("descriptionD");

    displays.appendChild(cityD);
    displays.appendChild(temperatureD);
    displays.appendChild(humidityD);
    displays.appendChild(descriptionD);
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorD");

    displays.textContent = "";
    displays.style.display = "flex";
    displays.appendChild(errorDisplay);
}