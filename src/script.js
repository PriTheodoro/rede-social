let USER_ID = window.location.search.match(/\?id=(.*)/)[1];
database = firebase.database();
$(document).ready(function(){
  database.ref('/users/' + USER_ID + '/posts/').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childkey = childSnapshot.key;
      let childData = childSnapshot.val();
      createPost(childkey, childData.text, childData.likes);
    });
  });
  $('#input-post').keyup(postDisabled);
  $("#post-message-button").click(sendAndCreateData);
  $("#filter-privacy").change(filterSelect);
});
function createPost(dataPost, message, likes){
  $("#post-list").prepend(`
  <li>
    <p id="post-message">${message}</p>
    <button class="like__btn animated" data-like-id="${dataPost}">
      <i class="like__icon fa fa-heart"></i>
      <span class="like__number" data-like-id="${dataPost}">${likes}</span>
    </button>
    <button data-edit-id=${dataPost}>Editar</button>
    <button data-del-id=${dataPost}>Apagar</button>
  </li>`)
  $(`button[data-del-id=${dataPost}]`).click(function() {
    let confirmDel = confirm("Confirma a exclusão da postagem?")
    if(confirmDel){
    $(this).parent().remove();
    database.ref("users/" + USER_ID + "/posts/" + dataPost).remove()
    }
  })
  $(`button[data-edit-id=${dataPost}]`).click(function() {
    $("#post-message").html(`
    <input type="text" id="input-edit" value=${message}>
    <button id="edit-save">Salvar</button>`)
    $("#edit-save").click(function(){
      let newText = $("#input-edit").val();
      database.ref("users/" + USER_ID + "/posts/" + dataPost).update({
        text: newText
      })
    $("#post-message").html(newText);
    message = newText;
    })
  })
  $(`button[data-like-id=${dataPost}]`).click(function() {
    if (!$(this).hasClass('like__btn--disabled')) {
      updated_likes = parseInt($(`.like__number[data-like-id="${dataPost}"]`).html()) + 1;
      database.ref("users/" + USER_ID + "/posts/" + dataPost).update({likes: updated_likes});
      $(`.like__number[data-like-id="${dataPost}"]`).html(updated_likes);
      }
    $(this).attr('disabled', true).addClass('tada');
 });
 console.log("Entrou no Create")
}
function sendPostToDB(message, privacy){
  let idFromDB = database.ref('users/' + USER_ID + '/posts').push({
    text: message,
    privacy: privacy,
    likes: 0
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
  let privacy = $('#privacy').val();
  let likesData = 0;
  let dataPost = sendPostToDB(message, privacy).key;
  createPost(dataPost, message, likesData)
  $('#input-post').val("");
  postDisabled();
}

function filterSelect(){
    let privacySelect = $("#filter-privacy").val();
    if(privacySelect === "Todos"){
      database.ref('/users/' + USER_ID + '/posts/').once('value', function(snapshot) {
        $("#post-list").html("");
        snapshot.forEach(function(childSnapshot) {
          let childkey = childSnapshot.key;
          let childData = childSnapshot.val();
          createPost(childkey, childData.text, childData.likes);
        });
      });
  }else{
    database.ref('/users/' + USER_ID + '/posts/')
    .orderByChild('privacy').equalTo(privacySelect)
    .once('value', function (snapshot) {
      $("#post-list").html("");
      snapshot.forEach(function(childSnapshot) {
        /*let childkey = childSnapshot.key;
        let childData = childSnapshot.val();
        createPost(childkey, childData.text, childData.likes);*/
        console.log(childSnapshot.val())
     });
    });
  }
}

