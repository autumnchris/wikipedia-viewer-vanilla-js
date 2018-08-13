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
      $('.results').html(`<p class="message error-message"><span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Unable to find results for "${searchInput}". Consider revising your search.</p>`);
    }

    else {
      searchResults.map(entry => {
        entries = `<article>
          <h2>${entry.title}</h2>
          <p>${entry.snippet}...</p>
          <p>
            <a href="https://en.wikipedia.org/wiki/${entry.title}" target="_blank">Continue Reading...</a>
          </p>
        </article>`;
        $('.results').append(entries);
      });
    }
  }).fail(() => {
    $('.spinner').css('display', 'none');
    $('.results').html('<p class="message error-message"><span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Unable to load Wikipedia search results.</p>');
  });
  return false;
}

$('form').submit(submitSearch);
