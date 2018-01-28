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


//Eventful Info

var apikey = "Tj5Zg74QCVP6c9xQ"; 
var date;
var where;

function getEvents()

{

   var oArgs = {

      app_key: apikey,

    //  q: "music",

      where: where, 

      date: date,

      within: "25 miles",

      page_size: 5,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData);

      console.log(oData.events.event[0].title);
      console.log(oData.events.event[0].venue_name);

      
        

      

      $("#locate").text(oData.events.event[0].title);
      $("#locate").append("<img src=" + oData.events.event[0].image.medium.url + ">");     
      // Note: this relies on the custom toString() methods below

  });

};


$("#submit-button").on("click", function(){

  event.preventDefault();

  where = $("#where").val().trim();
  date = $("#when").val().trim();
getEvents()

});


