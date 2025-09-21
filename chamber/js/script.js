// ===== WEATHER with OpenWeatherMap =====
const apiKey = "YOUR_API_KEY"; // <-- put your API key here
const city = "San Salvador";   // <-- replace with your city
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=en`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    // Current weather
    document.querySelector("#current-temp").textContent = `${data.list[0].main.temp.toFixed(1)} °C`;
    document.querySelector("#weather-desc").textContent = data.list[0].weather[0].description;

    // Forecast (approx. every 24h = every 8 intervals of 3h)
    const forecastEls = document.querySelectorAll(".forecast-day");
    for (let i = 1; i <= 3; i++) {
      const forecast = data.list[i * 8];
      forecastEls[i - 1].textContent = `${forecast.main.temp.toFixed(1)} °C`;
    }
  })
  .catch(err => console.error("Weather data error:", err));


// ===== BUSINESS SPOTLIGHTS =====
fetch("data/members.json")
  .then(res => res.json())
  .then(members => {
    // Filter only gold and silver
    const spotlights = members.filter(m => m.level === "gold" || m.level === "silver");

    // Randomly select 2 or 3
    const selected = spotlights.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.querySelector(".spotlight-container");

    selected.forEach(m => {
      const card = document.createElement("div");
      card.classList.add("spotlight");
      card.innerHTML = `
        <img src="${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p><em>${m.level} member</em></p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Member data error:", err));
