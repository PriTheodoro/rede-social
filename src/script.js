let USER_ID = window.location.search.match(/\?id=(.*)/)[1];
$(document).ready(function(){
  firebase.database().ref('/users/' + USER_ID + '/posts/').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childkey = childSnapshot.key;
      var childData = childSnapshot.val().text;
      createPost(childkey, childData);
    });
  });
  $('#input-post').keyup(postDisabled);
  $("#post-message-button").click(sendAndCreateData);
});
function createPost(dataPost, message){
  $("#post-list").prepend(`
  <li>
    <p id="post-message">${message}</p>
    <button data-edit-id=${dataPost}>Editar</button>
    <button data-del-id=${dataPost}>Apagar</button>
  </li>`)
  $(`button[data-del-id=${dataPost}]`).click(function() {
    $(this).parent().remove();
    firebase.database().ref("users/" + USER_ID + "/posts/" + dataPost).remove()
  })
  $(`button[data-edit-id=${dataPost}]`).click(function() {
    $("#post-message").html(`
    <input type="text" id="input-edit" value=${message}>
    <button id="edit-save">Salvar</button>`)
    $("#edit-save").click(function(){
      let newText = $("#input-edit").val();
      firebase.database().ref("users/" + USER_ID + "/posts/" + dataPost).update({
        text: newText
      })
    $("#post-message").html(newText);
    message = newText;
    })
  })
}
function sendPostToDB(message){
  let idFromDB = firebase.database().ref('users/' + USER_ID + '/posts').push({
    text: message
  });
  return idFromDB;
}
function postDisabled(){
  $('#input-post').val() === "" ? 
  $('#post-message-button').prop("disabled", true) : $('#post-message-button').prop("disabled", false);
}
function sendAndCreateData(event){
  event.preventDefault();
  let message = $("#input-post").val();
  let dataPost = sendPostToDB(message).key;
  createPost(dataPost, message)
  $('#input-post').val("");
  postDisabled();
}
