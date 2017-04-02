// Initialize Firebase
var config = {
  apiKey: "AIzaSyAjuulCONwPwcOKrnAuKi4SP5BNrDIGcSA",
  authDomain: "usuallyhungry-d037e.firebaseapp.com",
  databaseURL: "https://usuallyhungry-d037e.firebaseio.com",
  projectId: "usuallyhungry-d037e",
  storageBucket: "usuallyhungry-d037e.appspot.com",
  messagingSenderId: "827227044917"
};
firebase.initializeApp(config);

var $table = $(".js-restaurants");

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
    "  <td>" + rank + "</td>",
    "  <td>" + "<a href='" + website + "' target=blank>" + restaurantName + "</a>"+ "</td>",
    "  <td>" + restaurantCity + "</td>",
    "  <td>" + restaurantCountry + "</td>",
    "  <td>" + status + "</td>",
    "  <td>" + totalYears + "</td>",
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

// TODO: fast sliding creates multiples
var changeListByYear = function(slideData) {
  var currentYear = parseInt($(".js-current-year").text())
  var year = slideData.value;
  if (year !== currentYear) {
    $table.empty();
    $(".js-current-year").text(year);
    addRowsForYear(year);
  }
}

$('#ex1').slider({
  formatter: function(value) {
    return 'Current value: ' + value;
  }
}).on('slide', changeListByYear);
