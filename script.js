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
      const weather = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;
      const location = `${data.name}, ${data.sys.country}`;
      const description = data.weather[0].description;

      // Set weather background
      setWeatherBackground(weather);

      resultDiv.innerHTML = `
        <strong>${location}</strong><br>
        🌡️ ${temp}°C<br>
        ☁️ ${description}
      `;
    } else {
      resultDiv.textContent = "City not found.";
      body.style.backgroundImage = "";
    }
  } catch (error) {
    resultDiv.textContent = "Failed to fetch weather data.";
    body.style.backgroundImage = "";
  }
}

function setWeatherBackground(condition) {
  const body = document.getElementById("body");

  if (condition.includes("cloud")) {
    body.style.backgroundImage = "url('https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif')";
  } else if (condition.includes("rain")) {
    body.style.backgroundImage = "url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif')";
  } else if (condition.includes("clear") || condition.includes("sun")) {
    body.style.backgroundImage = "url('https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif')";
  } else if (condition.includes("snow")) {
    body.style.backgroundImage = "url('https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif')";
  } else {
    body.style.backgroundImage = "url('https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif')";
  }
}
