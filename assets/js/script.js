function getGeo() {
  var city = $("#search-term").val().trim();
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=ef4d434f6c0ded9efd8dfb84c576ce99`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      getOneCall(data[0].lat, data[0].lon);
    });
}
function getOneCall(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=ef4d434f6c0ded9efd8dfb84c576ce99`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherCard = $("<div>")
        .addClass("card")
        .attr("style", "border: 1px solid black");

      var currentTemp = $("<h2>")
        .addClass("card-title")
        .text(data.current.temp);

      //added
      var currentUvi = $("<h2>").addClass("card-title").text(data.current.uvi);

      $("#weather-main").append(weatherCard.append(currentTemp));
      //added
      $("weather-main").append(weatherCard.append(currentUvi));
    });
}

$("#search-Btn").on("click", getGeo);

//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
