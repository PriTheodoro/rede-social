$(document).ready(function(){
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
      .then(function(result) {
          console.log("Usuário criado")
          console.log(result)
          writeUserData(result.user.uid, name, picture, age, gender)
          //window.location = "profile.html"
      })
      .catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          $("#cadHelp").html(errorMessage);
          console.log(errorCode, errorMessage)
      });
    }
  
  })

    $("#sign-in-google").click(function(){
        let provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).then(function(result) {
         // window.location = "profile.html"
         console.log("Logado com Google");
         console.log(result) 
         writeUserDataGoogle(result.user.uid, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture)
         let token = result.credential.accessToken;
         let user = result.user;
    
        }).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
      })

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
