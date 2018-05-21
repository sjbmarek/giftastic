

var animalList = ["Cat", "Dog", "Hamster", "Fox", "Deer", "Racoon", "Lizard", "Eagle"]  

  function renderButtons() {
    $("#buttonList").empty();
      // Loop through the animals, generate buttons for each animal in the array
    for (var i = 0; i<animalList.length; i++) {
      var addButton = $("<button>");
      addButton.addClass("animalButton btn btn-info m-1");
      addButton.attr("data-animal", animalList[i]);
      addButton.text(animalList[i]);
      $("#buttonList").append(addButton);
    }
  };

  $(".submit").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    event.preventDefault();
     // grab the text the user types into the input field
     var addAnimal = $("#newAnimal").val().trim();
    // add the new animal to the array
    if (addAnimal.length>0 && (/^[a-zA-Z]+$/.test(addAnimal))) {
      animalList.push(addAnimal);
      renderButtons();
     };
    // clear the input field
    $("#newAnimal").val(" ");
  });


  $(document).on("click", ".animalButton", function() {
    $("#gifs-appear-here").empty();
    var animalx = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animalx + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

     $("#gif-label").text("Ten popular gifs for: " + animalx.toUpperCase());

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item float-left ml-3'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);

        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif");

          // gifDiv.addClass("float-left");
          gifDiv.prepend(p);
          gifDiv.prepend(animalImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });



  $(document).on("click", ".gif", function() {
    console.log("gif was clicked");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


  renderButtons();

