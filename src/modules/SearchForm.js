import axios from 'axios';
import { ResultsContainer } from './ResultsContainer';

const SearchForm = (() => {

  function submitSearch(event, searchInput) {
    event.preventDefault();
    ResultsContainer.removeSearchResults();
    ResultsContainer.removeErrorMessage();
    ResultsContainer.renderLoadingSpinner();
    searchInput = searchInput.trim();

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
        ResultsContainer.removeLoadingSpinner();
        ResultsContainer.renderErrorMessage('Unable to load Wikipedia search results at this time.');
      });
    }
  }

  function renderForm() {
    const searchForm = document.createElement('form');
    searchForm.setAttribute('role', 'search');
    searchForm.setAttribute('novalidate', 'true');
    searchForm.classList.add('search-form');
    searchForm.innerHTML = `
    <div class="form-group">
      <span class="fas fa-search search-icon" aria-hidden="true"></span>
      <input type="text" class="search-input" aria-label="Search Wikipedia..." placeholder="Search Wikipedia..." required autofocus />
    </div>
    <div class="button-group">
      <button type="submit" class="button">Search</button>
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
