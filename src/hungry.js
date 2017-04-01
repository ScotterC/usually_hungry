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

function addRow(data) {
  var attrs             = data.val()
  var restaurantName    = attrs.name;
  var restaurantCity    = attrs.city;
  var restaurantCountry = attrs.country;
  var status            = attrs.status;
  var totalYears        = attrs.total_years;
  var website           = attrs.website;

  var content = $([
    "<tr>",
    "  <td>" + (parseInt(data.key)+1) + "</td>",
    "  <td>" + restaurantName + "</td>",
    "  <td>" + restaurantCity + "</td>",
    "  <td>" + restaurantCountry + "</td>",
    "  <td>" + status + "</td>",
    "  <td>" + totalYears + "</td>",
    "  <td>" + website + "</td>",
    "</tr>"
  ].join("\n"));

  $table.append(content);
}

var database      = firebase.database();
var restaurantRef = database.ref("restaurants");
var rankRef       = database.ref("ranks");

function addRowsForYear(year) {
  rankRef.orderByChild("year").equalTo(year).on('child_added', function(rankData) {
    restaurantRef.orderByChild("id").equalTo(rankData.val().restaurant_id).on('child_added', function(restaurantData) {
      addRow(restaurantData);
    });
  });
}



addRowsForYear(2016);


$('#ex1').slider({
  formatter: function(value) {
    return 'Current value: ' + value;
  }
});
