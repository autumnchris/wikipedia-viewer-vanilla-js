const ResultsContainer = (() => {

  function renderLoadingSpinner() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.innerHTML = `<span class="fa fa-sync-alt fa-spin fa-2x fa-fw" aria-label="Loading..."></span>`;

    document.querySelector('main').appendChild(loadingSpinner);
  }

  function removeLoadingSpinner() {
    document.querySelector('main').removeChild(document.querySelector('.loading-spinner'));
  }

  function renderErrorMessage(messageText) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> ${messageText}`;

    document.querySelector('main').appendChild(errorMessage);
  }

  function removeErrorMessage() {
    document.querySelector('main').removeChild(document.querySelector('.error-message'));
  }

  function renderSearchResults(searchResults) {
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results');
    searchResultsContainer.innerHTML = searchResults.map(resultItem => {
      return `<article class="result-item">
        <h2>${resultItem.title}</h2>
        <p>${resultItem.snippet}...</p>
        <a href="https://en.wikipedia.org/wiki/${resultItem.title}" class="button" target="_blank">Continue Reading &raquo;</a>
      </article>`;
    }).join('');

    document.querySelector('main').appendChild(searchResultsContainer);
  }

  function removeSearchResults() {
    document.querySelector('main').removeChild(document.querySelector('.search-results'));
  }

  return {
    renderLoadingSpinner,
    removeLoadingSpinner,
    renderSearchResults,
    removeSearchResults,
    renderErrorMessage,
    removeErrorMessage
  };
})();

export { ResultsContainer };
