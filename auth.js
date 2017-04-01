// key.json is a service account key downloaded from the Firebase Console
var key = require('./usuallyhungry-d037e-firebase-adminsdk-zb34x-38b4918361.json');

var google = require('googleapis');
var request = require('request');

var DATABASE_URL = 'https://usuallyhungry-d037e.firebaseio.com';

var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database'
]);

jwtClient.authorize(function(err, tokens) {
  console.log(tokens)
  console.log(jwtClient)
  request({
    url: DATABASE_URL + '/.json',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokens.access_token
    }
  }, function(err, resp) {
    if(err != null) {
      console.log(err);
    }
    console.log(resp.body);
  });
});
