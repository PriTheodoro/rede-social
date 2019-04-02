$(document).ready(function(){
    $("#post-message-button").click(function(event){
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
    });
});

