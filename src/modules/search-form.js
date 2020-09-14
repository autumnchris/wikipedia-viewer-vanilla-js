import axios from 'axios';
import { ResultsContainer } from './results-container';

const SearchForm = (() => {

  function submitSearch(event, searchInput) {
    event.preventDefault();
    document.querySelector('.search-results') ? ResultsContainer.removeSearchResults() : null;
    document.querySelector('.error-message') ? ResultsContainer.removeErrorMessage() : null;
    ResultsContainer.renderLoadingSpinner();

    if (!searchInput) {
      ResultsContainer.removeLoadingSpinner();
      ResultsContainer.renderErrorMessage('A text input must be submitted to get search results.');
    }
    else {
      axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&origin=*&format=json`).then(wikiData => {
        const searchResults = wikiData.data.query.search;
        ResultsContainer.removeLoadingSpinner();
        searchResults.length === 0 ? ResultsContainer.renderErrorMessage(`Unable to find results for "${searchInput}". Consider revising your search.`) : ResultsContainer.renderSearchResults(searchResults);
      }).catch(() => {
        ResultsContainer.removeLoadingSpinner()
        ResultsContainer.renderErrorMessage('Unable to load Wikipedia search results at this time.');
      });
    }
  }

  function renderForm() {
    const searchForm = document.createElement('form');
    searchForm.setAttribute('role', 'search');
    searchForm.classList.add('search-form');
    searchForm.innerHTML = `
    <div class="form-group">
      <span class="fas fa-search search-icon"></span>
      <input type="search" class="search-input" aria-label="Search Wikipedia..." placeholder="Search Wikipedia..." autofocus required />
    </div>
    <div class="button-group">
      <input type="submit" class="button" value="Search" />
      <a href="https://en.wikipedia.org/wiki/Special:Random" class="button" target="_blank">Random Article</a>
    </div>`;

    document.querySelector('main').appendChild(searchForm);
  }

  return {
    submitSearch,
    renderForm
  };
})();

export { SearchForm };
