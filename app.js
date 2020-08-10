$(document).ready(function () {

  // DOM Variables
  const cityName = $('.city-name');
  const searchBtn = $('.city-search');

  // City List Array
  let cityList = [];

  // Search Functionality
  searchBtn.on('click', function () {
    // API URL
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName.val()}&appid=bb9ce599fcfd1ddd0bc51db84a830cfd&units=imperial`;

    // Getting Weather Data
    getWeather(weatherURL);

    // Add city to city list;
  });

  const getWeather = url => {
    // API CALL CURRENT WEATHER
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (response) {
      const weatherSection = $('.weather-forecast');
      console.log(response)
      // store coordinates
      let coord = {
        lat: response.coord.lat,
        lon: response.coord.lon
      }

      const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&
      exclude=current,minutely,hourly&appid=bb9ce599fcfd1ddd0bc51db84a830cfd`

      getForecast(forecastURL);
    });
  }

  const getForecast = url => {
    // API CALL 5 DAY FORECAST
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (response) {
      console.log(response.daily);
    })
  }

})