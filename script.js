 async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  const apiKey = "b68c66ac9b5fbdbeb027fcb286dd4acd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        🌡️ Temperature: ${data.main.temp}°C<br>
        ☁️ Weather: ${data.weather[0].description}
      `;
    } else {
      resultDiv.textContent = "City not found.";
    }
  } catch (error) {
    resultDiv.textContent = "Failed to fetch data.";
  }
}

