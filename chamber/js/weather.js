// ===== WEATHER SECTION =====
const apiKey = "a1ef2e2fd02131c68f248b7947b7fc06";  // Your API key (keep quotes)
const city = "San Salvador";                        // Change to your chamber location
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    // Display current temperature
    document.querySelector("#current-temp").textContent =
      `${data.list[0].main.temp.toFixed(1)} °C`;

    // Display current weather description
    document.querySelector("#weather-desc").textContent =
      data.list[0].weather[0].description;

    // Display 3-day forecast (every 24h ≈ 8 intervals of 3h)
    const forecastEls = document.querySelectorAll(".forecast-day");
    for (let i = 1; i <= 3; i++) {
      const forecast = data.list[i * 8];
      forecastEls[i - 1].textContent =
        `${forecast.main.temp.toFixed(1)} °C - ${forecast.weather[0].description}`;
    }
  })
  .catch(err => console.error("Weather API error:", err));
