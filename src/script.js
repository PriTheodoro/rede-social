let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
  firebase.database().ref('/users/' + USER_ID + '/posts/').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childkey = childSnapshot.key;
      var childData = childSnapshot.val();
      $("#post-list").prepend(`<li><div>${childData.text}</li></li>`);
    });
  });

function timelinePost(message){
    firebase.database().ref('users/' + USER_ID + '/posts').push({
      text: message
    });
  }
});
