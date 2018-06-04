// Initialize Firebase
console.log('js file started');

// var config = {
//   apiKey: "AIzaSyAM-grjDpptQv1WMhQ_QfhAtfAQs8lkvkg",
//   authDomain: "nightout-2d0c1.firebaseapp.com",
//   databaseURL: "https://nightout-2d0c1.firebaseio.com",
//   projectId: "nightout-2d0c1",
//   storageBucket: "nightout-2d0c1.appspot.com",
//   messagingSenderId: "451771085344"
// };

// firebase.initializeApp(config);

// const dbRef = firebase.database().ref("Logger/eventInfo");

// we create an on click event for when user submits form
$("#submit-button").click(function (event) {
  event.preventDefault();

  // // get zipcode input from user and store in search property of weatherOptions
  // weatherOptions.search = $("#userInput").val().trim();

  // // then we use package to find weather info for user's zipcode
  // weather.find(weatherOptions, function (err, result) {
  //   // if there is an error log it
  //   if (err) {
  //     console.log(err);
  //   }
  //   JSON.stringify(result, null, 2);
  //   console.log(result);
  // });

  // getEvents();

});



//Eventful Info

// $(document).ready(function(){
let eventsArray;
let panelRefs = ["#one!", "#two!", "#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!", "#ten!"];
let panelColors = ["teal", "purple", "blue", "green", "deep-purple", "light-blue", "blue-grey darken-4", "pink", "indigo", "cyan"];

// create an object constructor holding properties for eventful requests
const EventfulArguments = function () {
  // api key
  this.app_key = "Tj5Zg74QCVP6c9xQ";
  // variable called where as an empty string to later hold user zipcode input
  this.where = '';
  // a date property that is an object with two properties for a range of dates
  this.date = moment().weekday(5).format("YYYYMMDD00") + '-' + moment().weekday(7).format("YYYYMMDD00");
  // a string holding the radius in miles from user zipcode input
  this.within = "25 miles";
  // page_size as an integer to indicate number of results
  this.page_size = 10;
  // a string sort_order to sort over popularity in this case
  this.sort_order = "popularity";
}


let eventArgs = new EventfulArguments();
// console.log(test.where());

// when the user hits submit... 
$("form").on("submit", function () {
  // prevent default behavior
  event.preventDefault();

  // capture user input and store into where property of eventArgs
  eventArgs.where = $("#user-input").val().trim();

  // geocode user input
  initGeocode();


  // we empty the #user-input element
  $("#user-input").val("");
  // and we get our events
  getEvents();
});

var lat;
var lng;
function initGeocode() {

  var address = eventArgs.where;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // console.log(results[0].geometry.location.lat());
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      // console.log(lat);
    }
    else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });


}



function getEvents() {
  var oArgs = eventArgs;

  EVDB.API.call("/events/search", oArgs, function (oData) {
    console.log(oData);

    // we declare an array eventsArray that contains the array of events returned from eventful
    eventsArray = oData.events.event;
    // we invoke preloading
    preloading();

    // we invoke cardSpace
    setTimeout(cardSpace, 4000);

    // We loop over each index of eventsArray to create and style cards
    // these will hold event names, times, and other relevant info
    setTimeout(cardLoop, 4500);

    setTimeout(embedMap, 5000);
  });
}

function preloading() {
  // we create a div containing a header for our preloader
  // we also give it attributes
  let preloadHeaderDiv = $("<div>").attr({
    class: "container",
    id: "index-banner"
  });

  // we create our header with relevant classes
  let preloadHeader = $("<h2>Loading your weekend!</h2>").attr({
    class: "header center orange-text loading-header",
  });

  preloadHeaderDiv.append(preloadHeader);

  // now we generate a div of class row
  // to be appended to dynamic div

  $(".loading-row").empty();
  $(".progress").remove();

  let loadingRow = $("<div>").attr("class", "row center loading-row");
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
  let emptyLoading = function () {
    // $(".toRemove").remove();
    let determinateDiv = $("<div>").attr("class", "determinate");
    indeterminateDiv.replaceWith(determinateDiv);
  }
  setTimeout(emptyLoading, 3500);
}

let cardRow;
// declare function that generates containers where cards will be shown
function cardSpace() {
  // empty .card-row if it exists
  $(".card-row").empty();

  // we dynamically generate a card div with class row
  let cardDiv = $("<div>").attr("class", "row card-row");
  // we dynamically generate an empty column and append to cardDiv
  // we append a div of class "col s12 m2"
  emptyColumn = $("<div>").attr("class", "col s12 m2");
  cardDiv.append(emptyColumn);

  // we create a cardColum where our cards will live
  let cardColumn = $("<div>").attr("class", "col s12 m8");
  cardDiv.append(cardColumn);

  // more specifically,they will live in this cardRow
  cardRow = $("<div>").attr("class", "row");
  // append this cardRow to cardDiv
  cardColumn.append(cardRow);

  // and we apppend our carouselDiv to our dynamicDiv
  $("#globalContainer").append(cardDiv);
}


// declare a function to loop over eventArray and create style cards.
function cardLoop() {
  eventsArray.forEach((event, index) => {
    // console.log(event);
    // console.log(index);
    // generate a card placeholder Div with relevant attributes,
    let cardPlace = $("<div>").attr({
      "class": "col s12 m6",
      id: "cardPlace"
    });

    // generate a card div of class card
    let card = $("<div>").attr("class", "card");
    // add color corresponding to the panelColors array
    card.addClass(panelColors[index] + " darken-4");

    cardPlace.append(card);

    // we generate a div of class card-content and white-text
    let cardContent = $("<div>").attr("class", "card-content white-text");
    card.append(cardContent);
    // next we generate our span with class card-title
    let spanTitle = $("<span>").attr("class", "card-title").text(event.title);
    cardContent.append(spanTitle);
    // we append a paragraph to this title
    let spanParagraph = $("<p>").attr("class", "spanParagraph").text(event.venue_name);
    spanParagraph.append("<p>" + event.city_name + "</p>");
    spanTitle.append(spanParagraph);

    // we generate a .card-action Div 
    let cardAction = $("<div>").attr("class", "card-action");
    // we generate a link and append to cardAction
    let cardLink = $("<a>").attr({
      "href": event.url,
      target: "_blank"
    }).text("Learn more");;

    // we append cardAction to card and cardLink to cardAction
    card.append(cardAction);
    cardAction.append(cardLink);

    cardRow.append(cardPlace);

  })

}


// declare a function that will embed a google map html element on our site
// var map;
// var infowindow;

function embedMap() {
  console.log('hey im here');

  // console.log(lat, lng);
  var map;
  var infowindow;

  function initMap() {

    var pyrmont = { lat: lat, lng: lng };

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    function nearbySearch() {
      service.nearbySearch({
        location: pyrmont,
        radius: 10000,
        type: ['restaurant']
      }, callback);
    }

    nearbySearch();

  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
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

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  initMap();
}
// const embedMap = () => {
//   google.maps.event.addDomListener(window, 'load', initMap);
// }
