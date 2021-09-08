$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").keyup(function (event) {
    const determineTheLength = $(this).val().length;

    const maxCharacters = 140;
    const charactersRemaining = maxCharacters - determineTheLength;

    const $parent = $(this).closest("form"); // find the parent of counter first to transverse
    const $liveCounter = $parent.find(".counter"); // find the class counter, we use liveCounter as a proxy to Counter

    // const $liveCounter = $(this).closest("form").find(".counter") long form of above
    // const $liveCounter = $(this).closest(".counter")

    $liveCounter.text(charactersRemaining);

    if (charactersRemaining < 0) {
      $liveCounter.css("color", "red");
    } else {
      $liveCounter.css("color", "black");
    }
  });
});
