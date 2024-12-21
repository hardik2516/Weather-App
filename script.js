const apiKey = "77f602b5751878016a2bf594b4640278";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (data.cod === "404") {
        document.querySelector('.error').innerHTML = "Place not found. Please try again.";
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        return;
    }

    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} km/h`;

    if (data.weather[0].main.toLowerCase() === "clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main.toLowerCase() === "rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main.toLowerCase() === "clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main.toLowerCase() === "snow") {
        weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main.toLowerCase() === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main.toLowerCase() === "mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Initial check for a default city (e.g., Berlin)
checkWeather("delhi");
