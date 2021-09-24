/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  // A function designed to avoid cross-site scripting from user input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $("#compose-tweet").click(function () {
    $("#tweet-text").focus()
  })

  const createTweetElement = function (obj) {
  const $tweet = $(`<article class="tweet">
                <header class="tweet-header">
                  <div>
                    <img src="${escape(obj.user.avatars)}"></i>
                  <p>
                    ${escape(obj.user.name)}
                  </p>
                </div>
                  <p>
                    ${escape(obj.user.handle)}
                  </p>
                </header>
                <div>
                ${escape(obj.content.text)}
                </div>
                <footer class="tweet-footer">
                  <p>
                    ${escape(timeago.format(obj.created_at))}
                  </p>
                  <div>
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i></i>
                  </div>
                </footer>
              </article>
        `);

  return $tweet;
};

const renderTweets = function(tweetsArray) {

  $("#tweets-container").empty()
  // loops through tweets  
    for (const tweet of tweetsArray) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)

      // takes return value and appends it to the top of tweets container
      $("#tweets-container").prepend($tweet);
    }
    
  }


  $(".input-error").hide()

  $("form").submit(function (event) {
    event.preventDefault();
    $(".active-error").empty()
    
    const $currentTweet = $(this).serialize()
    
    const $overError = "Tweet past character limit!"
    
    const $underError = "There's nothing to tweet!"
    
    console.log($("#tweet-text").val().length)
    if ($("#tweet-text").val().length > 140) {

      
      $(".active-error").append($overError)
      $(".input-error").show("slow")
      return;
    }
    
    if ($("#tweet-text").val().length <= 0) {
      $(".active-error").append($underError)
      $(".input-error").show("slow")
      return;
    }
    
    $(".input-error").slideUp()
    
    $.ajax({url: "/tweets", method: "POST", data: $currentTweet}).then(function(response) {
      
      $.get("/tweets", function(data, status) {
        renderTweets(data)
      })
      
      $("#tweet-text").val("")
    })
  
  });


  const loadTweets = function() {
    $.get("/tweets", function(data, status) {
      renderTweets(data)
    })
  }
  loadTweets();
});

