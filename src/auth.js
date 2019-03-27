$(document).ready(function(){
    $("#sign-up-btn").click(function(event){
        event.preventDefault();
      let email = $("#email-input").val();
      let password = $("#password-input").val();
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(result) {
          console.log("Usuário criado")
          console.log(result)
          writeUserData(result.additionalUserInfo.profile.id, name, picture)
        //window.location = "profile.html"
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
      
    })

   /* $("#password-input").keyDown(function(){
        if($("#password-input0") ==! $("#password-input")){
            $("#passwordHelp").html("As senhas diferem.")
        }else{
            $("#passwordHelp").html("As senhas são iguais.")
        }
        })*/


    $("#sign-in-google").click(function(){
        let provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider).then(function(result) {
         // window.location = "profile.html"
         console.log("Logado com Google");
         console.log(result) 
         writeUserData(result.additionalUserInfo.profile.id, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture)
         let token = result.credential.accessToken;
         let user = result.user;
    
        }).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
      })
  })
