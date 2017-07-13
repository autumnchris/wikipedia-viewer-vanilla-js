function loadData() {

  $('#results').html('');

  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?callback=?',
    data: {
      action: 'query',
      list: 'search',
      srsearch: $('#search-field').val(),
      format: 'json'
    },
    dataType: 'jsonp',
    success: function(wikiData) {
      var searchResults = wikiData.query.search;

      for (var i = 0; i < searchResults.length; i++) {
        var articleTitle = searchResults[i].title;
        var articleSnippet = searchResults[i].snippet;
        var articleURL = 'https://en.wikipedia.org/wiki/' + articleTitle;
        var entries = '<div class="well center-block"><h2>' + articleTitle + '</h2><p>' + articleSnippet + '...</p><a href="' + articleURL + '" target="_blank">Continue Reading...</a></div>';
        $('#results').append(entries);
      }
    },
    error: function() {
      $('#results').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load Wikipedia search results.</div>');
    }
  });

  return false;
};

$('form').submit(loadData);
