$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").keyup(function () {
    const determineTheLength = $(this).val().length;

    const MAXCHARCOUNT = 140;
    const charactersRemaining = MAXCHARCOUNT - determineTheLength;

    const $parent = $(this).closest("form"); // find the parent of counter first to transverse
    const $liveCounter = $parent.find(".counter"); // find the class counter, we use liveCounter as a proxy to Counter

    $liveCounter.text(charactersRemaining);

    if (charactersRemaining < 0) {
      $liveCounter.css("color", "red");
    } else {
      $liveCounter.css("color", "black");
    }
  });
});
