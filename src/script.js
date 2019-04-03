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
  $("#post-message-button").click(function (event){
      event.preventDefault();
      let message = $("#input-post").val();
      timelinePost(message);
      $("#post-list").prepend(`<li><div>${message}</li></li>`);
      
  })
  /*$("#post-message-button").click(function(event){
      event.preventDefault();
      let input = $("#input-post").val();
      $("#post-list").prepend(`<li><div>${input}</li></li>`);
      function divClicked() {
          var divHtml = $(this).html();
          var editableText = $("<textarea />");
          editableText.val(divHtml);
          $(this).replaceWith(editableText);
          editableText.focus();
          // setup the blur event for this new textarea
          editableText.blur(editableTextBlurred);
      }
      
      function editableTextBlurred() {
          var html = $(this).val();
          var viewableText = $("<div>");
          viewableText.html(html);
          $(this).replaceWith(viewableText);
          // setup the click event for this new div
          viewableText.click(divClicked);
      }
      $("div").click(divClicked);
  });*/
});

function timelinePost(message){
  firebase.database().ref('users/' + USER_ID + '/posts').push({
    text: message
  });
}
