$(document).ready(function () {

  // DOM Variables
  const cityName = $('.city-name');
  const searchBtn = $('.search-btn');
  const uvNumber = $('<span>');

  // City List Array
  let cityList = !localStorage.getItem('city list') ? [] : JSON.parse(localStorage.getItem('city list'));

  // render list function
  const renderList = () => {
    cityList.map(city => {
      // Create city button
      const cityBtn = $('<button class="city-btn">');

      // Cap first letter of each city name
      $('.city-list').prepend(cityBtn.text(city.replace(/(^| )(\w)/g, char => char.toUpperCase())));

      // Search city weather on click
      cityBtn.on('click', function (e) {
        e.preventDefault();
        // Map City name to Weather API URL
        const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb9ce599fcfd1ddd0bc51db84a830cfd&units=imperial`;

        // Getting Weather Data
        getWeather(weatherURL);
      });
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
      // Map current data to DOM
      $('.card-title').text(`${response.name} (${new Date().toLocaleString().slice(0, 9)})`);

      $('.temp').text(`temp: ${response.main.temp} °F`);

      $('.humidity').text(`humidity: ${response.main.humidity} %`);

      $('.wind-speed').text(`wind speed: ${response.wind.speed} MPH`);

      // store coordinates
      let coord = {
        lat: response.coord.lat,
        lon: response.coord.lon
      }

      // map coords to forecast API URL
      const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&
      exclude=current,minutely,hourly&units=imperial&appid=bb9ce599fcfd1ddd0bc51db84a830cfd`

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
      const currentUV = response.current.uvi;

      // Map current UV index
      $('.uv-index').text(`UV Index: `);
      $('.uv-index').append(uvNumber.text(`${currentUV}`));

      // Change UV color
      if (currentUV >= 11) {
        uvNumber.removeClass('very-high high moderate low').addClass('extreme');
      } else if (currentUV >= 8) {
        uvNumber.removeClass('extreme high moderate low').addClass('very-high');
      } else if (currentUV >= 6) {
        uvNumber.removeClass('extreme very-high moderate low').addClass('high');
      } else if (currentUV >= 3) {
        uvNumber.removeClass('extreme very-high high low').addClass('moderate');
      } else {
        uvNumber.removeClass('extreme very-high high moderate').addClass('low');
      }
    });
  }

});