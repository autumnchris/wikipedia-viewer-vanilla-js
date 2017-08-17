function loadData() {

  var searchInput = $('#search-input').val();
  $('#results').empty();

  $.ajax({
    dataType: 'jsonp',
    url: 'https://en.wikipedia.org/w/api.php?callback=?',
    data: {
      action: 'query',
      list: 'search',
      srsearch: searchInput,
      format: 'json'
    }
  }).done(function(wikiData) {
    var searchResults = wikiData.query.search;

    if (searchResults.length === 0) {
      $('#results').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to find results for ' + '\"' + searchInput + '\"' + '. Consider revising your search.</div>');
    }

    else {
      for (var i = 0; i < searchResults.length; i++) {
        var articleTitle = searchResults[i].title;
        var articleSnippet = searchResults[i].snippet;
        var articleURL = 'https://en.wikipedia.org/wiki/' + articleTitle;
        var entries = '<article><div class="well center-block"><h2>' + articleTitle + '</h2><p>' + articleSnippet + '...</p><a href="' + articleURL + '" target="_blank">Continue Reading...</a></div></article>';
        $('#results').append(entries);
      }
    }
  }).fail(function() {
    $('#results').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load Wikipedia search results.</div>');
  });

  return false;
}

$('form').submit(loadData);
