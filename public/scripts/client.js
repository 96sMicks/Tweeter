/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


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


  // loops through tweets  
    for (const tweet of tweetsArray) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)

      
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
    }
    
  }



  $("form").submit(function (event) {
    event.preventDefault();
    
    const $unSafeCurrentTweet = $(this).serialize()

    const $safeHTML = escape($unSafeCurrentTweet)
    
    
    
    
    if ($safeHTML.length > 145) {
      window.alert("Tweet past character limit!")
      return;
    }
    
    if ($safeHTML.length < 6 ) {
      window.alert("There's nothing to tweet!")
      return;
    }
    
    
    $.ajax({url: "/tweets", method: "POST", data: $safeHTML}).then(function(response) {
      
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

