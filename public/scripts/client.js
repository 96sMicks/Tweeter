/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const createTweetElement = function (obj) {
  const $tweet = $(`<article class="tweet">
                <header class="tweet-header">
                  <div>
                    <img src="${obj.user.avatars}"></i>
                  <p>
                    ${obj.user.name}
                  </p>
                </div>
                  <p>
                    ${obj.user.handle}
                  </p>
                </header>
                <div>
                ${obj.content.text}
                </div>
                <footer class="tweet-footer">
                  <p>
                    ${timeago.format(obj.created_at)}
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

  // Reversing so we can loop from the bottom and bring new tweets up top
  const reversedArray = tweetsArray.reverse()

  // loops through tweets reversed 
    for (const tweet of reversedArray) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)

      
      // takes return value and appends it to the tweets container
      $("#tweets-container").append($tweet);
    }
    
  }



  $("form").submit(function (event) {
    event.preventDefault();
    
    const $currentTweet = $(this).serialize()
    
    if ($currentTweet.val > 140) {
      window.alert("Tweet past character limit!")
      return;
    }
    
    if ($currentTweet.val < 1 ) {
      window.alert("There's nothing to tweet!")
      return;
    }
    
    
    $.ajax({url: "/tweets", method: "POST", data: $currentTweet}).then(function(response) {
      
      $.get("/tweets", function(data, status) {
        renderTweets(data)
      })
      
      $( "#tweet-text" ).val('')
    })

  
  });


  const loadTweets = function() {

    $.get("/tweets", function(data, status) {
      renderTweets(data)
    })
  
    // $.get("/", function (data, status) {
    //   renderTweets(data)
    // })
  }
  loadTweets();
});


// const $tweet = createTweetElement(hardCodeTweet);
// console.log($tweet);

