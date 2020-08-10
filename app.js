$(document).ready(function () {

  // DOM Variables
  const cityName = $('.city-name');
  const searchBtn = $('.search-btn');

  // City List Array
  let cityList = !localStorage.getItem('city list') ? [] : JSON.parse(localStorage.getItem('city list'));

  // render list function
  const renderList = () => {
    cityList.map(city => {
      const cityBtn = $('<button class="city-btn">');

      cityBtn.on('click', function (e) {
        e.preventDefault();
        // Map City name to Weather API URL
        const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb9ce599fcfd1ddd0bc51db84a830cfd&units=imperial`;

        // Getting Weather Data
        getWeather(weatherURL);
      })
      $('.city-list').prepend(cityBtn.text(city));
    });
  }

  // render city list on page load
  renderList();

  // Search Functionality
  searchBtn.on('click', function (e) {
    e.preventDefault();

    // Map City name to Weather API URL
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName.val()}&appid=bb9ce599fcfd1ddd0bc51db84a830cfd&units=imperial`;

    // Getting Weather Data
    getWeather(weatherURL);

    // Add city to city list;
    cityList.push(cityName.val());
    console.log(cityList);


    // Add city list to local storage
    localStorage.setItem('city list', JSON.stringify(cityList));

    // refresh list after each search
    $('.city-list').empty();
    renderList();

    // clear search bar
    cityName.val('');
  });

  // API CALL CURRENT WEATHER
  const getWeather = url => {
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

  // API CALL 5 DAY FORECAST
  const getForecast = url => {
    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (response) {
      console.log(response.daily);
    });
  }

});