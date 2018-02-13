var config = {
  apiKey: "AIzaSyDAzTPgI7C8G9C9xlj-0ZT6X8g690j-MWg",
  authDomain: "usually-hungry.firebaseapp.com",
  databaseURL: "https://usually-hungry.firebaseio.com",
  projectId: "usually-hungry",
  storageBucket: "",
  messagingSenderId: "354403057524"
};
firebase.initializeApp(config);

var $table       = $(".js-restaurants");
var FIRST_YEAR   = 2002
var CURRENT_YEAR = 2016

$(".js-first-year").text(FIRST_YEAR);
$(".js-current-year").text(CURRENT_YEAR);


function addRow(rankData, restaurantData) {
  var rankAttrs         = rankData.val();
  var restaurantAttrs   = restaurantData.val();
  var rank              = rankAttrs.rank;
  var restaurantName    = restaurantAttrs.name;
  var restaurantCity    = restaurantAttrs.city;
  var restaurantCountry = restaurantAttrs.country;
  var status            = restaurantAttrs.status;
  var totalYears        = restaurantAttrs.total_years;
  var website           = restaurantAttrs.website;

  var content = $([
    "<tr>",
    "  <td><p class='text-center'> #" + rank + "</p></td>",
    "  <td><p>" + restaurantName + "</p> <a href='" + website + "' target=blank>" + website + "</a> // " + status + "</td>",
    "  <td>" + restaurantCity + ", " + restaurantCountry + "</td>",
    "  <td>" + totalYears + " Years" + "</td>", // TODO: pluralize year/years
    "  <td><span class='glyphicon glyphicon-arrow-up' aria-hidden='true'></span></td>",
    "</tr>"
  ].join("\n"));

  $table.append(content);
}

var database      = firebase.database();
var restaurantRef = database.ref("restaurants");
var rankRef       = database.ref("ranks");

function addRowsForYear(year) {
  // Filter by Year
  rankRef.orderByChild("rank").on('child_added', function(rankData) {
    var data = rankData.val()
    if (data.year == year) {
      // TODO: Inefficient
      firebase.database().ref('/restaurants/' + (data.restaurant_id-1)).once('value').then(function(restaurantData) {
        addRow(rankData, restaurantData);
      });
    }
  });
}

addRowsForYear(2016);

var changeListByYear = function(slideData) {
  var currentYear = slideData.value.oldValue
  var year        = slideData.value.newValue

  // TODO: Need to find a way to ensure this executes only once
  // Maybe: If executed for this year. Don't run again
  if (year !== currentYear) {
    $table.empty();
    addRowsForYear(year);
  }
}

$('#year-slider').slider({
  reversed: true,
  min: FIRST_YEAR,
  max: CURRENT_YEAR,
  step: 1,
  value: CURRENT_YEAR,
  tooltip: 'show',
  handle: 'square'
}).on('change', changeListByYear);
