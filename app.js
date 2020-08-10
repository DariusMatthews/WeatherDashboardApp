$(document).ready(function () {

  // DOM Variables
  const cityName = $('.city-name');
  const searchBtn = $('.city-search');
  const weatherSection = $('.weather-forecast');

  // City List Array
  let cityList = !localStorage.getItem('city list') ? [] : JSON.parse(localStorage.getItem('city list'));

  // Search Functionality
  searchBtn.on('click', function () {

    // Map City name to Weather API URL
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName.val()}&appid=bb9ce599fcfd1ddd0bc51db84a830cfd&units=imperial`;

    // Getting Weather Data
    getWeather(weatherURL);

    // Add city to city list;
    cityList.push(cityName.val());

    // Add city list to local storage
    localStorage.setItem('city list', JSON.stringify(cityList));

    // Display city list
  });

  // Add City Buttons to list after each search


  const getWeather = url => {
    // API CALL CURRENT WEATHER
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (response) {
      console.log(response)

      // store coordinates
      let coord = {
        lat: response.coord.lat,
        lon: response.coord.lon
      }

      // map coords to forecast API URL
      const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&
      exclude=current,minutely,hourly&appid=bb9ce599fcfd1ddd0bc51db84a830cfd`

      // get 5 day forecast
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