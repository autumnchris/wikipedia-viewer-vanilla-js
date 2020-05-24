function submitSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.search-input').value;
  document.querySelector('.spinner').style.display = 'block';
  document.querySelector('.search-results').innerHTML = '';

  axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&origin=*&format=json`).then(wikiData => {
    const searchResults = wikiData.data.query.search;
    document.querySelector('.spinner').style.display = 'none';

    if (searchResults.length === 0) {
      document.querySelector('.error-message').innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Unable to find results for "${searchInput}". Consider revising your search.`;
      document.querySelector('.error-message').style.display = 'block';
    }
    else {
      document.querySelector('.search-results').innerHTML = searchResults.map(resultItem => {
        return `<article class="result-item">
          <h2>${resultItem.title}</h2>
          <p>${resultItem.snippet}...</p>
          <a href="https://en.wikipedia.org/wiki/${resultItem.title}" class="button" target="_blank">Continue Reading &raquo;</a>
        </article>`;
      }).join('');
      document.querySelector('.error-message').style.display = 'none';
    }
  }).catch(() => {
    document.querySelector('.error-message').innerHTML = '<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Unable to load Wikipedia search results at this time.';
    document.querySelector('.spinner').style.display = 'none';
    document.querySelector('.error-message').style.display = 'block';
  });
}

document.querySelector('.search-form').addEventListener('submit', (event) => {
  submitSearch(event);
});
document.querySelector('.current-year').innerHTML = new Date().getFullYear();
