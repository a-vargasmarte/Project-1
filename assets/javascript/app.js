  // Initialize Firebase
  console.log('js file started');

  var config = {
    apiKey: "AIzaSyAM-grjDpptQv1WMhQ_QfhAtfAQs8lkvkg",
    authDomain: "nightout-2d0c1.firebaseapp.com",
    databaseURL: "https://nightout-2d0c1.firebaseio.com",
    projectId: "nightout-2d0c1",
    storageBucket: "nightout-2d0c1.appspot.com",
    messagingSenderId: "451771085344"
  };

  firebase.initializeApp(config);

  const dbRef = firebase.database().ref("Logger/eventInfo");


// connecting to the weather API

// we create a weatherKey
const weatherKey = "c890f4972862b62b5b669b4cd555a436";

// we declare a variable zipcode that will later store user's zipcode input
let zipcode;

let weatherQueryURL;
// we create an on click event for when user submits form
//$("#submit").click(function(event) {
  //  event.preventDefault();

    // get inputs
    //zipcode = $("#zip-input").val().trim();

    // we declare a variable holding the URL corresponding to the zipcode input
    //weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherKey;

    //console.log(weatherQueryURL);
    // we now make the ajax call with the 'GET' method
    //$.ajax({
        // url: weatherQueryURL,
        // method: 'GET'
    //}).done(function(response) {
        // console.log(response);
    //});    
//});


//Eventful Info

$(document).ready(function(){

var apikey = "Tj5Zg74QCVP6c9xQ"; 
var date;
var where;
var what;

function getEvents()

{

   var oArgs = {

      app_key: apikey,

   //   q: what,

      where: where, 

      when: "This weekend",

      date: date,

      within: "25 miles",

      page_size: 10,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData);

     // console.log(oData.events.event[0].title);
     // console.log(oData.events.event[0].venue_name);


      let eventsArray = oData.events.event;
      
        for (let i = 0; i < eventsArray.length; ++i){
          console.log(eventsArray[i]);

          var eventDiv = $("<div>");

          var eventInfo = eventsArray[i].title;



          var eventimg = $("<img>");

          var eventurl = $("<a>Click Here!</a>");

          eventurl.attr("href", eventsArray[i].url);

           if (eventsArray[i].image === null) {
            eventimg.attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/33699-200.png")
          }
         
          else {eventimg.attr("src", eventsArray[i].image.medium.url)};

          eventDiv.text(eventInfo);

          eventDiv.append(eventurl);

          eventDiv.append(eventimg);

          $("#resultOne").prepend(eventDiv);
         // $("#locate").text(eventsArray[i].title);
         // $("#locate").append("<img src=" + eventsArray[i].image.medium.url + ">");
        }


  });

};


$("#submit-button").on("click", function(){

  event.preventDefault();

  $("#locate").empty();

  where = $("#where").val().trim();
  date = $("#when").val().trim();
//  what = $("#what").val().trim();



getEvents()

});

});








