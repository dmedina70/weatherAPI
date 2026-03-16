const search_button = document.getElementById("search_button");

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const status = document.getElementById("status");
  const result = document.getElementById("result");
  const state = document.getElementById("stateInput").value.trim();

  result.innerHTML = '';

  if (!city) {
    status.innerHTML = '<p class="error">Please enter a city name</p>';
    return;
  }

  if (!state) {
    status.innerHTML = '<p class="error">Please enter a state name</p>';
    return;
  }


  status.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const response = await fetch(`/search?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!response.ok) {
      status.innerHTML = `<p class="error">${data.error || 'Something went wrong'}</p>`;
      return;
    }

    status.innerHTML = '';

    const cityName = data.city.name;
    const country = data.city.country;
    const forecastList = data.list.slice(0, 5);

    let html = `
      <div class="weather-card">
        <h2>${cityName}, ${country}</h2>
    `;

    forecastList.forEach(item => {
      html += `
        <div class="forecast-item">
          <strong>${item.dt_txt}</strong><br>
          Temperature: ${item.main.temp} °C<br>
          Feels like: ${item.main.feels_like} °C<br>
          Weather: ${item.weather[0].description}
        </div>
      `;
    });

    html += `</div>`;
    result.innerHTML = html;

  } catch (error) {
    console.error(error);
    status.innerHTML = '<p class="error">Failed to fetch weather data</p>';
  }
}

search_button.addEventListener("click", getWeather);