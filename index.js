const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      cityInput.value = '';
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError('Please enter a city');
  }
});

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('City not found. Please try again.');
  }

  const data = await response.json();
  return data;
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = '';
  card.style.display = 'flex';

  const cityDisplay = document.createElement('h1');
  const tempDisplay = document.createElement('p');
  const humidityDisplay = document.createElement('p');
  const descriptionDisplay = document.createElement('p');
  const weatherEmoji = document.createElement('p');

  cityDisplay.textContent = city;
  cityDisplay.classList.add('city-display');

  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempDisplay.classList.add('temp-display');

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add('humidity-display');

  descriptionDisplay.textContent = description;
  descriptionDisplay.classList.add('description-display');

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add('weather-emoji');

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return '⛈️';
    case weatherId >= 300 && weatherId < 400:
      return '🌦️';
    case weatherId >= 500 && weatherId < 600:
      return '🌧️';
    case weatherId >= 600 && weatherId < 700:
      return '❄️';
    case weatherId >= 700 && weatherId < 800:
      return '🌫️';
    case weatherId === 800:
      return '☀️';
    case weatherId >= 801 && weatherId < 810:
      return '☁️';
    default:
      return '❓';
  }
}

function displayError(message) {
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('error-display');

  card.textContent = '';
  card.style.display = 'flex';
  card.appendChild(errorDisplay);

  setTimeout(() => {
    card.style.display = 'none';
  }, 3000);
}
