// connecting to the weather API

// we create a weatherKey
const weatherKey = "c890f4972862b62b5b669b4cd555a436";

// we declare a variable zipcode that will later store user's zipcode input
let zipcode;

let weatherQueryURL;
// we create an on click event for when user submits form
$("#submit").click(function(event) {
    event.preventDefault();

    // get inputs
    zipcode = $("#zip-input").val().trim();

    // we declare a variable holding the URL corresponding to the zipcode input
    weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherKey;

    console.log(weatherQueryURL);
    // we now make the ajax call with the 'GET' method
    $.ajax({
        url: weatherQueryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
    });    
});




