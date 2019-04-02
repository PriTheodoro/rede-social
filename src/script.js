
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
        'photoUrl' : photoUrl,
    })
}


