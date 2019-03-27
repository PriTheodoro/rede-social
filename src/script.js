function writeUserData(userId, displayName, photoUrl){
    firebase.database().ref('users/' + userId).set({
        'displayName': displayName,
        'photoUrl' : photoUrl
    })

}

