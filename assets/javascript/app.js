// connecting to the weather API

// we create a constant variable with a sample URL for Carrboro NC
const weatherQueryURL = "http://samples.openweathermap.org/data/2.5/weather?zip=27510,us&appid=324cf8afb8064251c24b6f3c51561345";

// we now make the ajax call with the 'GET' method
$.ajax({
    url: weatherQueryURL,
    method: 'GET'
}).done(function(response) {
    console.log(response);
});