function submitSearch() {

  const searchInput = $('.search-input').val();
  $('.spinner').css('display', 'block');
  $('.results').empty();

  $.ajax({
    dataType: 'jsonp',
    url: 'https://en.wikipedia.org/w/api.php?callback=?',
    data: {
      action: 'query',
      list: 'search',
      srsearch: searchInput,
      format: 'json'
    }
  }).done(wikiData => {
    let entries;
    const searchResults = wikiData.query.search;
    $('.spinner').css('display', 'none');

    if (searchResults.length === 0) {
      $('.results').html(`<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to find results for "${searchInput}". Consider revising your search.</div>`);
    }

    else {
      searchResults.map(entry => {
        entries = `<article>
          <div class="well center-block">
            <h2>${entry.title}</h2>
            <p>${entry.snippet}...</p>
            <a href="https://en.wikipedia.org/wiki/${entry.title}" target="_blank">Continue Reading...</a>
          </div>
        </article>`;
        $('.results').append(entries);
      });
    }
  }).fail(() => {
    $('.spinner').css('display', 'none');
    $('.results').html('<div class="alert alert-warning text-center"><span class="fa fa-warning fa-lg fa-fw"></span> Unable to load Wikipedia search results.</div>');
  });
  return false;
}

$('form').submit(submitSearch);
