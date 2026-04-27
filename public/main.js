const searchButton = document.getElementById("search_button");
const cityInput = document.getElementById("cityInput");
const stateInput = document.getElementById("stateInput");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("result");


function showStatus(type, message) {
  statusBox.innerHTML = `<p class="${type}">${message}</p>`;
}

function clearStatus() {
  statusBox.innerHTML = "";
}

function formatDateTime(dateText) {
  const date = new Date(dateText);
  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function renderEmptyState() {
  resultBox.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⛅</div>
      <h2>No forecast yet</h2>
      <p>Search for a city to load weather details here.</p>
    </div>
  `;
}

function renderForecast(data) {
  const cityName = data.city.name;
  const country = data.city.country;
  const forecastList = data.list.slice(0, 5);

  const forecastCards = forecastList
    .map((item) => {
      return `
        <article class="forecast-item">
          <div class="forecast-time">${formatDateTime(item.dt_txt)}</div>
          <p class="temperature">${Math.round(item.main.temp)}°C</p>
          <p class="forecast-description">${item.weather[0].description}</p>
          <div class="forecast-meta">
            <span><strong>Feels like</strong><span>${Math.round(item.main.feels_like)}°C</span></span>
            <span><strong>Humidity</strong><span>${item.main.humidity}%</span></span>
            <span><strong>Wind</strong><span>${item.wind.speed} m/s</span></span>
          </div>
        </article>
      `;
    })
    .join("");


     
  resultBox.innerHTML = `
    <section class="weather-card">
      <div class="weather-header">
        <div>
          <p class="location-label">Forecast results</p>
          <h2>${cityName}, ${country}</h2>
        </div>
        <p class="forecast-subtitle">Showing the next 5 forecast points</p>
        <label class="switch">
          <input id='tempSlider' type="checkbox">
          <span class="slider round"></span>
      </label>
      </div>

      <div class="forecast-grid">
        ${forecastCards}
      </div>
    </section>
  `;

    function changeTemp(tempSlider){
  temp = document.getElementsByClassName("temperature")
  console.log(temp[0])
    if (tempSlider.cheked) {
    // Code to run if the checkbox is checked
    console.log('Checkbox is now checked.');
    // Example: Show a div or enable a button
  } else {
    // Code to run if the checkbox is unchecked
    console.log('Checkbox is now unchecked.');
    // Example: Hide a div or disable a button
  }
}
  
    const tempSlider = document.getElementById("tempSlider")

    tempSlider.addEventListener('change', ()=> {
      changeTemp(tempSlider)
    }))


}

async function getWeather() {
  const city = cityInput.value.trim();
  const state = stateInput.value.trim();

  resultBox.innerHTML = "";
  clearStatus();

  if (!city) {
    showStatus("error", "Please enter a city name.");
    cityInput.focus();
    renderEmptyState();
    return;
  }

  if (!state) {
    showStatus("error", "Please enter a state.");
    stateInput.focus();
    renderEmptyState();
    return;
  }

  searchButton.disabled = true;
  showStatus("loading", "Loading forecast...");

  try {
    const response = await fetch(
      `/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`
    );

    const data = await response.json();

    if (!response.ok) {
      showStatus("error", data.error || "Something went wrong.");
      renderEmptyState();
      return;
    }

    clearStatus();
    renderForecast(data);
  } catch (error) {
    console.error(error);
    showStatus("error", "Failed to fetch weather data.");
    renderEmptyState();
  } finally {
    searchButton.disabled = false;
  }
}



searchButton.addEventListener("click", getWeather);


[cityInput, stateInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });
});

renderEmptyState();