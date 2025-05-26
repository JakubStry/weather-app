const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  if (city.trim()) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
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
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Could not fetch weather data.');
  }

  const data = await response.json();
  return data;
}

function displayWeatherInfo(data) {}

function weatherEmoji(weatherId) {}

function displayError(message) {
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('error-display');

  card.textContent = '';
  card.style.display = 'flex';
  card.appendChild(errorDisplay);
}
