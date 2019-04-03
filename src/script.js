let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
  firebase.database().ref('/users/' + USER_ID + '/posts/').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childkey = childSnapshot.key;
      var childData = childSnapshot.val();
      $("#post-list").prepend
      (`<li>${childData.text}</li>
      <button class="edit-btn">Editar</button>
      <button data-post-id=${childkey}>Apagar</button>`);
    });
  });
  $("#post-message-button").click(function (event){
      event.preventDefault();
      let message = $("#input-post").val();
      let dataPost = timelinePost(message);
      
      $("#post-list").prepend(`<li data-post-id=${dataPost.key}>${message}</li>`);
      
  })
});

function timelinePost(message){
  let idFromDB = firebase.database().ref('users/' + USER_ID + '/posts').push({
    text: message
  });
  return idFromDB;
}
$(`button[data-post-id='${childkey}]'`).click(function (){
  console.log("oi")

})