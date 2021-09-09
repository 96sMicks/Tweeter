/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const hardCodeTweet = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

$(document).ready(function() {
  const createTweetElement = function (obj) {
  const $tweet = $(`<article>
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

const $tweet = createTweetElement(hardCodeTweet);

console.log($tweet);

$(".tweet-display").append($tweet);
})
