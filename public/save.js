$.getJSON("/savedArticles", function (data) {
  // For each one

  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#saved").append("<div class='card' data-id='" + data[i]._id + "'>" + "<div class='card-header bg-primary'>" + data[i].h2 + "<button type='button' class='btn btn-lg articlenote' data-toggle='modal' data-target='#myModal'  data-id='" + data[i]._id + "'>ARTICLE NOTE</button><button type='button' class='btn btn-lg btn-danger deletesavearticle' data-id='" + data[i]._id + "'>DELETE SAVED ARTICLE</button></div>" + "<div class='card-body'>" + "<p> " + data[i].p + "</p>" + "</div>" + "</div>"); //data[i].link + "<br />" + data[i].title + "<br />" +     
  }
});

$(document).on("click", ".articlenote", function () {
  // console.log("button click");
  var thisId = $(this).attr("data-id");
  $(".modal-title").empty();
  $("#newnotesave").empty();
  $(".modal-title").append("Notes For Article : " + thisId);
  $(".savenewnote").attr('data-id', thisId);
  $.ajax({
    method: "GET",
    url: "/savedArticles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);

      // If there's a note in the article
      if (data.note) {
        // console.log(data.note[0]);
        // Place the body of the note in the body textarea
        const idArray = [] = data.note;
        // console.log(idArray);
        for (let i = 0; i < idArray.length; i++) {
          console.log(idArray[i].body);
          $("#newnotesave").append("<li>" + idArray[i].body + "</li><hr>");
        }

      }
    });

});

$(document).on("click", ".savenewnote", function () {
  // console.log("button click");
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var inputnote = $(".inputnote").val();

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saveNote/" + thisId,
    data: {
      // Value taken from note textarea
      body: inputnote
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      //   $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $(".inputnote").val("");
  location.reload();

});

$(document).on("click", ".deletesavearticle", function () {
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  console.log("delete button")
  // $.ajax({
  //   method: "DELETE",
  //   url: "/deletesavedarticle/" + thisId
  // })
  // .then(function (data) {
  //   console.log(data);
  // });
  // location.reload();
});
