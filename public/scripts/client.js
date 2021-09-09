/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const hardCodeTweet = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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

const renderTweets = function(tweetsObj) {

  // loops through tweets
    for (const tweet of tweetsObj) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)

      
      // takes return value and appends it to the tweets container
      $("#tweets-container").append($tweet);
    }
    
  }

  renderTweets(hardCodeTweet)


  $("form").submit(function (event) {
    event.preventDefault();

    const querystring = $(this).serialize()
    
    
    $.ajax({url: "/tweets", method: "POST", data: querystring}).then(function(response) {
      console.log(response)
    })

  });



  const loadTweets = function() {
    $.ajax({url: "/tweets", method: "GET", })
  }

});


// const $tweet = createTweetElement(hardCodeTweet);
// console.log($tweet);

