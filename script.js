async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");
  const body = document.getElementById("body");

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
      const condition = data.weather[0].main.toLowerCase();

      // Change background based on condition
      switch (condition) {
        case "clear":
          body.style.backgroundImage = "url('https://i.gifer.com/7fZ.gif')"; // sunny gif
          break;
        case "clouds":
          body.style.backgroundImage = "url('https://i.gifer.com/8dL.gif')"; // cloudy gif
          break;
        case "rain":
        case "drizzle":
          body.style.backgroundImage = "url('https://i.gifer.com/VgF.gif')"; // rain gif
          break;
        case "snow":
          body.style.backgroundImage = "url('https://i.gifer.com/WlKx.gif')"; // snow gif
          break;
        case "thunderstorm":
          body.style.backgroundImage = "url('https://i.gifer.com/ZxK.gif')"; // storm gif
          break;
        default:
          body.style.backgroundImage = "url('https://i.gifer.com/1am.gif')"; // default
      }

      resultDiv.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        🌡️ Temp: ${data.main.temp}°C<br>
        ☁️ Weather: ${data.weather[0].description}
      `;
    } else {
      resultDiv.textContent = "City not found.";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching weather.";
  }
}
