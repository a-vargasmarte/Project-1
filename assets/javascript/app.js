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

// $(document).ready(function(){

var apikey = "Tj5Zg74QCVP6c9xQ"; 
var date;
var where;
var what;
// let eventsArray;

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
      let eventsArray = oData.events.event;
      
      // we use jQuery on the events!
      
      // we dynamically generate a carousel div
      let carouselDiv = $("<div>");

      // we activate via the bootstrap carousel attributes
      carouselDiv.attr({
        class: "carousel slide",
        id: "myCarousel",
        "data-ride": "carousel"
      });

      // we append this carouselDiv to #carouselRow
      $("#carouselRow").append(carouselDiv);

      // we now create and ordered list of carousel indicators
      let carouselIndicators = $("<ol>").attr("class", "carousel-indicators");

      // we create our active list tag
      activeListImg = $("<li>").attr({
        "data-target": "#myCarousel",
        "data-slide-to": "0"
      });

      // and then we append this activeListImg to carouselIndicators
      carouselIndicators.append(activeListImg);

      // and append our indicators to carouselDiv
      carouselDiv.append(carouselIndicators);

      // now we create our wrapper for slides

      // starting with a div with carousel-inner class
      let carouselInner = $("<div>").attr("class", "carousel-inner");

      // continuing with another div of class "item active"
      let activeItem = $("<div>").attr("class", "item active");

      // following with creating an image tag and attributes
      let activeImg = $("<img>").attr({
        src: eventsArray[0].image.medium.url,
        alt: "Event Image"
      });

      // now we create a div with our caption
      let activeCaption = $("<div>").attr("class", "carousel-caption").html("<h3>" + eventsArray[0].title + "</h3>" + "<h3>" + eventsArray[0].city_name + "</h3>");

      // we now append our image and caption to our .item active
      activeItem.append(activeImg, activeCaption);

      // and we append activeItem to carouselInner
      carouselInner.append(activeItem);

      // we then append carouselInner to carouselDiv
      carouselDiv.append(carouselInner);

      // we now add our left and right controls
      
      // first to our left...
      let leftControl = $("<a>").attr({
        class: "left carousel-control",
        href: "#myCarousel",
        "data-slide": "prev"
      });

      // we now create corresponding span classes
      let leftGlyphicon = $("<span>").attr("class", "glyphicon glyphicon-chevron-left");
      let leftSpan = $("<span>").attr("class", "sr-only").text("Previous");

      // append these two spans to leftControl
      leftControl.append(leftGlyphicon, leftSpan);

      // then to our right
      let rightControl = $("<a>").attr({
        class: "right carousel-control",
        href: "#myCarousel",
        "data-slide": "next"
      });

      // we now create span elements corresponding to our rightControl
      let rightGlyphicon = $("<span>").attr("class", "glyphicon glyphicon-chevron-right");
      let rightSpan = $("<span>").attr("class", "sr-only").text("Next");
      // append these two spans to rightControl

      rightControl.append(rightGlyphicon, rightSpan);

      // and we append our left and right controls to carouselDiv
      carouselDiv.append(leftControl, rightControl);

      // With the first event appended to the carousel, we follow with each subsequent one
      // We loop over each index of eventsArray (starting from index 1) 
      // to populate .carousel-indicators and .carousel-inner divs
      // for each event of the eventsArray...  
      for (let i = 1; i < eventsArray.length; ++i){
        console.log(eventsArray[i]);
        
        // create conditions
        
        // generate a list tag with carousel-relevant attributes,
        eventIndex = $("<li>").attr({
          "data-target": "#myCarousel",
          "data-slide-to": i
        });

        // append eventIndex[i] to carouselIndicators
        carouselIndicators.append(eventIndex);

        // generate a div with class "item"
        let itemDiv = $("<div>").attr("class", "item");

        // then we create our image
        let eventImg = $("<img>")
        
        // if we do not have an image property...
        if (!eventsArray[i].image) {
          // then we assign a placeholder as a url
          eventImg.attr({
            src: "http://via.placeholder.com/200",
            alt: "Placeholder Image"
          }); 
        }
        else {
          // then generate an image tag that points to its medium URL
          eventImg = $("<img>").attr({
            src: eventsArray[i].image.medium.url,
            alt: "Event Image"
          });
        }
        // next we generate a div with class "carousel-option"
        let carouselCaption = $("<div>").attr("class", "carousel-caption");
        
        // we create some cool headers
        // the event title
        let titleHeader = $("<h4>" + eventsArray[i].title + "</h4>" );
        // the event city
        let cityHeader = $("<h4>" + eventsArray[i].city_name + "</h4>");
        // the event start time...
        let eventStartTime = $("<h5> Starts at: " + eventsArray[i].start_time.substring(11) + "</h5>");

        // then we assign the event title as a <h3> tag using the .html() method
        carouselCaption.append(titleHeader, cityHeader, eventStartTime);
        

        // then we assign the city_name property of eventsArray
        // carousel
      
        // next we append our eventImg and carouselCaption to our itemDiv
        itemDiv.append(eventImg, carouselCaption);

        // finally we append our itemDiv to our carouselInner
        carouselInner.append(itemDiv);
      }           
    });
}

// when the user clicks on #submit-button
$("#submit-button").on("click", function(event){
  
  // we prevent the button from performing its default function
  event.preventDefault();

  // we store our inputs in redeclared variables
  where = $("#where").val().trim();
  date = $("#when").val().trim();
  //  what = $("#what").val().trim();

  

  // and with our inputs we invoke our function getEvents
  getEvents();
});

// });








