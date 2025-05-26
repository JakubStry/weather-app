const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.card');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value;

  if (city.trim()) {
  } else {
    displayError('Please enter a city');
  }
});

async function getWeatherData(city) {}

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
