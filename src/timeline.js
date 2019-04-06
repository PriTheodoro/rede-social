let database = firebase.database();

$(document).ready(function(){

    database.ref("posts/").once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            $("#post-list").prepend(`
            <li>${childData.text}</li>
            <button class="like__btn animated" data-id="${childKey}">
                <i class="like__icon fa fa-heart"></i>
                <span class="like__number" data-id="${childKey}">${childData.likes}</span>
            </button>
        `);

        $(`button[data-id="${childKey}"]`).on('click', function(){
            if (!$(this).hasClass('like__btn--disabled')) {
              updated_likes = parseInt($(`.like__number[data-id="${childKey}"]`).html()) + 1;
              database.ref("posts/" + childKey).update({likes: updated_likes});
              $(`.like__number[data-id="${childKey}"]`).html(updated_likes);
             }
            $(this).attr('disabled', true).addClass('tada');
        });
        
        });
      });

    $("#post-input-button").attr("disabled", "disabled");
    $("form").keyup(function(){
        $("#post-input-button").removeAttr("disabled");
    });

    $("#post-input-button").click(function(event){
        event.preventDefault();
        $("#post-input-button").attr("disabled", "disabled");
        let postInput = $("#post-input").val();
        $("#post-list").prepend(`
            <li>${postInput}</li>
            <button class="like__btn animated" data-id="${childKey}">
                <i class="like__icon fa fa-heart"></i>
                <span class="like__number" data-id="${childKey}">0</span>
            </button>
        `);

        $(`button[data-id="${childKey}"]`).on('click', function(){
            if (!$(this).hasClass('like__btn--disabled')) {
              updated_likes = parseInt($(`.like__btn[data-id="${childKey}"]`).html()) + 1;
              database.ref("posts/" + childKey).update({likes: updated_likes});
              $(`.like__number[data-id="${childKey}"]`).html(updated_likes);
             }
            $(this).attr('disabled', true).addClass('tada');
        });

        $("#post-input").val("");

        database.ref("posts/").push({
            text: postInput,
            likes: 0
        });
    });
    
});