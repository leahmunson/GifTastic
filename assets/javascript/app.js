$(document).ready(function() {
    // Intial array- list of Avatar characters/animals/other related things
    var topics = ['Avatar Aang', 'Katara', 'Sokka', 'Toph Beifong', 'The Firelord', 'Airbending', 'Princess Azula', 'Earthbending', 'Waterbending'];

    // All functions go below here:

    //Function to display info on topics by calling the API and retrieving info 
    function displayInfo(){
      $('#avatar-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=ObnW7RmdacLnyykJ7Zi2stEVFULe94Qp';

      // AJAX call  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        // If no information on topics is found, alert user
        if (response.pagination.total_count == 0) {
          alert('Sorry, there are no Gifs available for you! Try again!');
          var itemindex = topics.indexOf(topic);
          // otherwise, display button
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }
        
        // Save response from API call- use JSON get results

        var results = response.data;
        for (var j = 0; j < results.length; j++){
          // Create new Div
          var newTopicDiv = $("<div class='avatar-name'>");
          // GIF Rating
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          // GIF Title
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          // GIF URL
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif');
          // Appending info 
          newTopicDiv.append(pRating);
          newTopicDiv.append(pTitle);
          newTopicDiv.append(gif);
           // Putting the saved info to new div
          $('#avatar-view').prepend(newTopicDiv);
        } 
      });
    };
    
    // Function for displaying buttons
    function renderButtons() {
      // Deletes the movies prior to adding new movies
      $('.buttons-view').empty();
      // Loops through the array of topics to create buttons for all topics
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    // Function to remove buttons
    function removeButton(){
      $("#avatar-view").empty();
      var topic = $(this).attr('data-name');
      var itemindex = topics.indexOf(topic);
      if (itemindex > -1) {
        topics.splice(itemindex, 1);
        renderButtons();
      }
    }

    // Function to play or pause Gif images
    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    ///Event listeners go here:

    // Click on the submit button to add a new avatar-related button
    $("#add-avatar").on("click", function(event) {
      event.preventDefault();
      // capture input from form
      var avatar = $("#avatar-input").val().trim();
      // check if topic exsits already
      if (topics.toString().toLowerCase().indexOf(avatar.toLowerCase()) != -1) {
        alert("Topic already exists");
      }
      else {
        topics.push(avatar);
        renderButtons();
      }
    });

    // Click on an avatar button to display Gifs and other info from API
    $(document).on("click", ".topic", displayInfo);
    // Click on the Gif image to animate or make it still
    $(document).on("click", ".animate-gif", playGif);
    // Double-click on any avatar button to remove it from the array. Tried this for the first time.
    $(document).on("dblclick", ".topic", removeButton);

    // Function to display the intial buttons
    renderButtons();


});