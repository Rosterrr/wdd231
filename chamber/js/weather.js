async function loadWeather() {
    const apiKey = '602006374b41a57c20f534fe41655223'; // Replace with your actual API key
    const lat = 13.9931; // Latitude for Google Building in El Salvador
    const lon = -89.3832; // Longitude for Google Building in El Salvador
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    const weatherContainer = document.getElementById('weather'); // Ensure this matches the HTML ID
    weatherContainer.innerHTML = 'Loading data...'; // Show loading message initially

    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const weatherData = await response.json();

        // Clear the loading message
        weatherContainer.innerHTML = '';

        // Extract relevant data (current weather + 3-day forecast)
        const currentWeather = weatherData.current;
        const forecast = weatherData.daily.slice(0, 3); // Get the next 3 days forecast

        // Display current weather
        const currentWeatherHTML = `
            <h3>Current Weather</h3>
            <p>Temperature: ${Math.round(currentWeather.temp)}°C</p>
            <p>Description: ${capitalizeWords(currentWeather.weather.map(w => w.description).join(', '))}</p>
        `;

        // Display 3-day forecast
        const forecastHTML = forecast
            .map((day, index) => `
                <div>
                    <h4>Day ${index + 1}</h4>
                    <p>Temperature: ${Math.round(day.temp.day)}°C</p>
                    <p>Description: ${capitalizeWords(day.weather.map(w => w.description).join(', '))}</p>
                </div>
            `)
            .join('');

        // Combine and insert the weather data into the container
        weatherContainer.innerHTML = currentWeatherHTML + forecastHTML;
    } catch (error) {
        console.error('Weather data fetch failed:', error);
        weatherContainer.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
    }
}

// Helper function to capitalize weather descriptions
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

loadWeather(); // Call the function to load weather when the page is ready
