function writeUserData(userId, displayName, photoUrl, age, gender){
  firebase.database().ref('users/' + userId).set({
      'displayName': displayName,
      'photoUrl' : photoUrl,
      'age' : age,
      'gender' : gender
  })
}
function writeUserDataSM(userId, displayName, photoUrl){
  firebase.database().ref('users/' + userId).set({
      'displayName': displayName,
      'photoUrl' : photoUrl
  })
}

$(document).ready(function () {
  $("#sign-up-btn").click(function(event){
    event.preventDefault();
    let email = $("#email-input").val();
    let password = $("#password-input0").val();
    let passwordConfirm = $("#password-input").val()
    let name = $("#name-input").val();
    let age = $("#age-input").val();
    let gender = $("#gender-input").val();
    let picture = "/image/avatar.png"
    if(password === passwordConfirm){
      firebase.auth().createUserWithEmailAndPassword(email, passwordConfirm)
      .then(function(result){
        writeUserData(result.user.uid, name, picture, age, gender)
        window.location = "profile.html?id=" + result.user.uid;
      })
      .catch(function(error) {
        $("#cadHelp").html(error.message);
        console.log(error.code, error.message)
      });
    }
  })
  $("#sign-in-emailAndPassword-btn").click(function (event) {
    event.preventDefault();
    let userEmail = $("#emailInput").val();
    let userPassword = $("#passwordInput").val();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(function (result) {
      window.location = "profile.html?id=" + result.user.uid;
    })
    .catch(function (error) {
      console.log(error.code, error,message)
    });
  });
  $("#sign-in-google-btn").click(function(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result){
      console.log(result);
      writeUserDataSM(result.user.uid, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture);
      window.location = "profile.html?id=" + result.user.uid;
    }).catch(function(error){
      console.log(error.code, error.message);
    });
  })
  $("#sign-in-facebook-btn").click(function () {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result){
      writeUserDataSM(result.user.uid, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture);
      window.location = "profile.html?id=" + result.user.uid;
    }).catch(function(error){
      console.log(error.code, error.message);
    });
  });   
  $("#sign-in-twitter-btn").click(function () {
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result){
      writeUserDataSM(result.user.uid, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture);
      window.location = "profile.html?id=" + result.user.uid;
    }).catch(function(error){
      console.log(error.code, error.message);
    });
  });   
  $("#password-input").keyup(function(){
    console.log("oi")
    let password = $("#password-input0").val()
    let passwordConfirm = $("#password-input").val()
    if(password === passwordConfirm){
      $("#passwordHelp").html("As senhas são iguais.");
      $("#passwordHelp").removeClass('red');
    }else{
      $("#passwordHelp").html("As senhas diferem.");
      $("#passwordHelp").addClass('red');
    }
  })
})