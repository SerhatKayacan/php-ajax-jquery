$(document).ready(function() {
  //POST-EKLE
  // save comment to database
  //sends a request with data to the server when a user clicks on the post button.
  $(document).on("click", "#submit_btn", function() {
    var name = $("#name").val();
    var comment = $("#comment").val();
    $.ajax({
      url: "server.php",
      type: "POST",
      data: {
        save: 1,
        name: name,
        comment: comment
      },
      success: function(response) {
        $("#name").val("");
        $("#comment").val("");
        $("#display_area").append(response);
      }
    });
  });

  //DELETE
  // delete from database
  //sends a request having a comment_id so as to identify the specific comment in the database by that id and delete it.
  $(document).on("click", ".delete", function() {
    var id = $(this).data("id");
    $clicked_btn = $(this);
    $.ajax({
      url: "server.php",
      type: "GET",
      data: {
        delete: 1,
        id: id
      },
      success: function(response) {
        // remove the deleted comment
        $clicked_btn.parent().remove();
        $("#name").val("");
        $("#comment").val("");
      }
    });
  });

  //UPDATE
  var edit_id;
  var $edit_comment;
  $(document).on("click", ".edit", function() {
    edit_id = $(this).data("id");
    $edit_comment = $(this).parent();
    // grab the comment to be editted
    var name = $(this)
      .siblings(".display_name")
      .text();
    var comment = $(this)
      .siblings(".comment_text")
      .text();
    // place comment in form
    $("#name").val(name);
    $("#comment").val(comment);
    $("#submit_btn").hide();
    $("#update_btn").show();
  });
  $(document).on("click", "#update_btn", function() {
    var id = edit_id;
    var name = $("#name").val();
    var comment = $("#comment").val();
    $.ajax({
      url: "server.php",
      type: "POST",
      data: {
        update: 1,
        id: id,
        name: name,
        comment: comment
      },
      success: function(response) {
        $("#name").val("");
        $("#comment").val("");
        $("#submit_btn").show();
        $("#update_btn").hide();
        $edit_comment.replaceWith(response);
      }
    });
  });
});
