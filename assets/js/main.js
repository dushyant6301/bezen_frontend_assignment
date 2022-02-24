
function checkPreferences() {
    if (localStorage.getItem('lastCountryName'))
    {
        $(".searchCountry").attr('value',localStorage.getItem('lastCountryName'));
        $("#btn1").click();
    }
    if (localStorage.getItem('lastPlaceName'))
    {
        $(".searchPlaces").attr('value',localStorage.getItem('lastPlaceName'));
        $("#btn2").click();
    }
}

$(document).ready(function() { // fetch by country
    $("#btn1").click(function() {
        var location = $(".searchCountry").val();
        $.getJSON('https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json', 
        async function(data) {
        for (var c in data){
                if (toTitleCase(data[c].country) == toTitleCase(location)){
                    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${data[c].city}&appid=e74c9e5fbb596ca3adfc7a1d50c46b0c&units=metric`,
                            function (json) {
                                localStorage.setItem('lastCountryName',location);
                                $("#maxTemp").text(`Max temperature (°C): ${json.main.temp_max}`);
                                $("#minTemp").text(`Max temperature (°C): ${json.main.temp_min}`);
                            });
                    break;
                }
            }
         });
    });
});

$(document).ready(function() { // fetch by place 
    $("#btn2").click(function() {
        var location = $(".searchPlaces").val();
        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e74c9e5fbb596ca3adfc7a1d50c46b0c&units=metric`,
            function (json) {
                $('#wIcon').attr('src', `http://openweathermap.org/img/w/${json.weather[0].icon}.png`);
                $("#stat").text(json.weather[0].description);
                $("#feelsLike").text(`Feels like (°C): ${json.main.feels_like}`);
                $("#humidity").text(`Humidity: ${json.main.humidity}`);
                $("#pressure").text(`Pressure: ${json.main.pressure}`);
                $("#temprature").text(`Temperature (°C): ${json.main.temp}`);
                localStorage.setItem('lastPlaceName',location);
            });
    });
});


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}