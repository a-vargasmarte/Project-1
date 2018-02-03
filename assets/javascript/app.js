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
let panelColors = ["teal", "purple", "blue", "green", "deep-purple", "light-blue", "blue-grey darken-4", "pink", "indigo", "cyan"];


function getEvents()

{

   var oArgs = {

      app_key: apikey,

   //   q: what,

      where: where, 

      // when: "This weekend",

      date: "2018020200-2018020400",

      within: "25 miles",

      page_size: 10,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData);

      // we declare an array eventsArray that contains the array of events returned from eventful
      eventsArray = oData.events.event;
      // console.log(eventsArray);
      // console.log(eventsArray[0].latitude + "," + eventsArray[0].longitude);
      // we use jQuery on the events!
      
      // we create a div containing a header for our preloader
      // we also give it attributes
      let preloadHeaderDiv = $("<div>").attr({
        class: "container",
        id: "index-banner"
      });

      // we create our header with relevant classes
      let preloadHeader = $("<h2>Loading your weekend!</h2>").attr({
        class: "header center orange-text",
      });

      preloadHeaderDiv.append(preloadHeader);

      // now we generate a div of class row
      // to be appended to dynamic div
      let loadingRow = $("<div>").attr("class", "row center");
      $("#dynamicDiv").append(loadingRow);
      
      // and we append our preloadHeader to our loadingRow
      loadingRow.append(preloadHeader);

      // we dynamically create a .progress div
      let progressDiv = $("<div>").attr("class", "progress").append("<h2>Loading your weekend!</h2");
      // this .progressDiv contains an .indeterminate div
      let indeterminateDiv = $("<div>").attr("class", "indeterminate");
      

      // we append indeterminateDiv to progressDiv
      progressDiv.append(indeterminateDiv);

      // then we append to #globalContainer
      $("#dynamicDiv").append(progressDiv);

      // we declare a function that empties #dynamicDiv
      let emptyLoading = function(){
        // $(".toRemove").remove();
        let determinateDiv = $("<div>").attr("class", "determinate");
        indeterminateDiv.replaceWith(determinateDiv);
        // and we apppend our carouselDiv to our dynamicDiv
        $("#globalContainer").append(cardDiv);
      }
      // we dynamically generate a card div with class row
      let cardDiv = $("<div>").attr("class", "row");
      // we append a div of class "col s12 m2"
      emptyColumn = $("<div>").attr("class", "col s12 m2");
      cardDiv.append(emptyColumn);

      // we create a cardColum where our cards will live
      let cardColumn = $("<div>").attr("class", "col s12 m8");
      cardDiv.append(cardColumn);

      // more specifically,they will live in this cardRow
      let cardRow = $("<div>").attr("class", "row");
      // append this cardRow to cardDiv
      cardColumn.append(cardRow);

      setTimeout(emptyLoading, 3500);

      // We loop over each index of eventsArray to create and style cards
      // these will hold event names, times, and other relevant info
      // for each event of the eventsArray...  
      for (let i = 0; i < eventsArray.length; ++i){
        console.log(eventsArray[i]);
        // console.log(panelColors[i]);
        // create conditions
        
        // generate a card placeholder Div with relevant attributes,
        let cardPlace = $("<div>").attr({
          "class": "col s12 m6",
          id: "cardPlace"
        });

        // generate a card div of class card
        let card = $("<div>").attr("class", "card");
        // add color corresponding to the panelColors array
        card.addClass(panelColors[i] + " darken-4");
        // darken these colors
        // card.addClass("darken-4");

        cardPlace.append(card);
        // we generate a div of class card-content and white-text
        let cardContent = $("<div>").attr("class", "card-content white-text");
        card.append(cardContent);        
        // next we generate our span with class card-title
        let spanTitle = $("<span>").attr("class", "card-title").text(eventsArray[i].title);
        cardContent.append(spanTitle);
        // we append a paragraph to this title
        let spanParagraph = $("<p>").attr("class", "spanParagraph").text(eventsArray[i].venue_name);
        spanParagraph.append("<p>" + eventsArray[i].city_name + "</p>");
        spanTitle.append(spanParagraph);

        // we generate a .card-action Div 
        let cardAction = $("<div>").attr("class", "card-action");
        // we generate a link and append to cardAction
        let cardLink = $("<a>").attr({
          "href": eventsArray[i].url,
          target: "_blank"}).text("Learn more");;

        // we append cardAction to card and cardLink to cardAction
        card.append(cardAction);
        cardAction.append(cardLink);

        cardRow.append(cardPlace);
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








