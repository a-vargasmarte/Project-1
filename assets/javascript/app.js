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
// we also declare a variable that will later house the coordinates of our weather app
let coord;

let weatherQueryURL;
// we create an on click event for when user submits form
$("#submit-button").click(function(event) {
   event.preventDefault();

    // get inputs
    zipcode = $("#userInput").val().trim();

    // we declare a variable holding the URL corresponding to the zipcode input
    weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherKey;

    console.log(weatherQueryURL);
    // we now make the ajax call with the 'GET' method
    $.ajax({
        url: weatherQueryURL,
        method: 'GET'
    }).done(function(response) {
        console.log(response.coord);
        // coord = response.coord;
    });    
});


//Eventful Info

// $(document).ready(function(){

let apikey = "Tj5Zg74QCVP6c9xQ"; 
let date;
let where;
let what;
let map;
let infowindow;
let eventsArray;
let panelRefs = ["#one!","#two!","#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!", "#ten!"];
let panelColors = ["red", "amber", "blue", "green", "purple", "orange", "yellow", "pink", "indigo", "cyan"];


function getEvents()

{

   var oArgs = {

      app_key: apikey,

   //   q: what,

      where: where, 

      when: "This weekend",

      date: date,

      within: "40 miles",

      page_size: 10,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData);

      // we declare an array eventsArray that contains the array of events returned from eventful
      eventsArray = oData.events.event;
      console.log(eventsArray);
      console.log(eventsArray[0].latitude + "," + eventsArray[0].longitude);
      // we use jQuery on the events!
      
      // we create a div containing a header for our preloader
      // we also give it attributes
      let preloadHeaderDiv = $("<div>").attr({
        class: "container",
        id: "index-banner"
      });

      // we create our header with relevant classes
      let preloadHeader = $("<h2>Loading your weekend!</h2>").attr({
        class: "header center orange-text toRemove",
      });

      preloadHeaderDiv.append(preloadHeader);

      $("#formDiv").replaceWith(preloadHeader);

      // we dynamically create a .progress div
      let progressDiv = $("<div>").attr("class", "progress toRemove").append("<h2>Loading your weekend!</h2");
      // this .progressDiv contains an .indeterminate div
      let indeterminateDiv = $("<div>").attr("class", "indeterminate toRemove");
      

      // we append indeterminateDiv to progressDiv
      progressDiv.append(indeterminateDiv);

      // then we append to #globalContainer
      $("#dynamicDiv").append(progressDiv);

      // we declare a function that empties #dynamicDiv
      let emptyLoading = function(){
        $(".toRemove").remove();
        // then we initialize this container with jQuery
        $(document).ready(function(){
          $('.carousel').carousel();
        });
        // and we apppend our carouselDiv to our dynamicDiv
        $("#globalContainer").append(carouselContainer);
      }
      // we dynamically generate a carousel div
      let carouselContainer = $("<div>");
      let carouselDiv = $("<div>");

      // we set materialize attributes
      carouselDiv.attr({
        class: "carousel carousel-slider center",
        "data-indicators": "true",
      });

      // we now create a div containing a button for our carousel
      // we add attributes and append an a tag in the same line
      let carouselFixed = $("<div>");
      let carouselButton = $("<a>").attr({
        class: "btn waves-effect white grey-text darken-text-2",
        id: "carouselButton"
      }).text("Learn more");
      // we add its attributes
      carouselFixed.attr("class", "carousel-fixed-item center").append(carouselButton);
      
      // now we append our carouselFixed and panels to our carouselDiv
      carouselDiv.append(carouselFixed);

      carouselContainer.append(carouselDiv);

      setTimeout(emptyLoading, 3500);
      // // With the carouselFixed appended to carouselDiv, we create panel slides dynamically
      // We loop over each index of eventsArray to create and populate panels with headings and p tags
      // these will hold event names, times, and other relevant info
      // for each event of the eventsArray...  
      for (let i = 0; i < eventsArray.length; ++i){
        console.log(eventsArray[i]);
        console.log(panelColors[i]);
        // create conditions
        
        // generate a panelDiv with carousel-relevant attributes,
        panelDiv = $("<div>").attr({
          "class": "carousel-item white-text",
          href: panelRefs[i]
        });

        panelDiv.addClass(panelColors[i]);

        // $("#carouselButton").attr("href", eventsArray[i].)

        // we create some cool headings and paragraphs
        // the event title
        let panelTitle = $("<h1>" + eventsArray[i].title + "</h1>" );
        // the event city
        let panelText = $("<h2>" + eventsArray[i].city_name + "</h2>");
        // the event start time...
        let eventStartTime = $("<h3> Starts at: " + eventsArray[i].start_time.substring(11) + "</h3>");
        
        // a learn more button that takes the user to the event url
        let learnMore = $("<button>").attr({
          class: "btn waves-effect waves-light",
          type: "submit",
          name: "action",
        }).text("Learn more");

        let eventLink = $("<a>").attr({
          "href": eventsArray[i].url,
          target: "_blank"}).text("Link to the event!");

        // learnMore.append(eventLink);

        // append these to our panelDiv
        panelDiv.append(panelTitle, panelText, eventStartTime);

        // append panelDiv to carouselDiv
        carouselDiv.append(panelDiv);
      }           
    });
}

var userCoord = ({lat: 35.7796, lng: -78.6382});



function initMap() {
  userCoord = userCoord;

  map = new google.maps.Map(document.getElementById('map'), {
      center: userCoord,
      zoom: 15
    });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map)
  service.nearbySearch({
    location: userCoord,
    radius: 1000,
    type: ['restaurant']
  }, callback)
}

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // var place = results[i];
        // console.log(place);
        createMarker(results[i]);
      }
    }
  } 

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }




// when the user clicks on #submit-button
$("#submit-button").on("click", function(event){
  
  // we prevent the button from performing its default function
  event.preventDefault();

  // we store our inputs in redeclared variables
  where = $("#userInput").val().trim();


  
  // then we empty our dynamicDiv
  // $("#dynamicDiv").empty();

  // and with our inputs we invoke our function getEvents
  getEvents();
  // invoke this function
  // initMap();
  
});

// });








