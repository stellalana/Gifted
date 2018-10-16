// Let's get this party started
$(document).ready(function() {

// variables
var topics = ["Explosions", "Danger", "Boxing", "Jumping", "Shooting", "Knife Throwing", "Shoot Dance"];

function makeBtns() {
    $("#btnDisplay").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifBtn = $("<button>");
        gifBtn.addClass("btn-gif btn btn-light");
        gifBtn.attr("data-name", topics[i]);
        gifBtn.text(topics[i]);
        $("#btnDisplay").append(gifBtn);
    }
} //makeBtns close



function addBtn() {
    $("#addTopic").on("click", function() {
        var topic = $("#add-topic").val().trim();
        topics.push(topic);
        makeBtns();
        $("#add-topic").val("");
        return false;
    });
    
} //addBtn close

makeBtns();
addBtn();

// API and AJAX
// "&api_key=T7qL5Bj7XgwF8TdU454lLOCWjPn2CKCF&limit=10" my key
function addGifSet() {
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=T7qL5Bj7XgwF8TdU454lLOCWjPn2CKCF&limit=10";
     // api close
    $.ajax({
        url: queryURL,
        method: 'GET'
    }) //ajax close

    .then(function(response) {
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        console.log(response);
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
          var t = $("<p>").text("Title: " + results[i].title.toUpperCase());
          // Creating and storing an image tag
          var topicGif = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          topicGif.attr("src", results[i].images.fixed_height_still.url);
          topicGif.attr("data-still",results[i].images.fixed_height_still.url); // still image
          topicGif.attr("data-animate",results[i].images.fixed_height.url); // animated image
          topicGif.attr("data-state", "still");   
          // Appending the paragraph and image tag to the gifDiv
          gifDiv.append(topicGif);
          gifDiv.append(p, t);
          // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifDisplay").prepend(gifDiv);
        }
      });
    };

// Pause Gif functionality 
$(document).on("click", "img", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// Dynamic Gif Button Click
$(document).on("click", ".btn-gif", addGifSet);

});