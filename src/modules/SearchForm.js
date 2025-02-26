import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import ResultsContainer from './ResultsContainer';
import ErrorMessage from './ErrorMessage';

class SearchForm {
  constructor() {
    this.loadingSpinner = new LoadingSpinner();
    this.errorMessage = new ErrorMessage();
    this.resultsContainer = new ResultsContainer();
  }

  handleSubmit(event, searchValue) {
    event.preventDefault();
    this.loadingSpinner.removeLoadingSpinner('main');
    this.resultsContainer.removeResultsContainer('main');
    this.errorMessage.removeErrorMessage('main');
    this.loadingSpinner.renderLoadingSpinner('main');
    searchValue = searchValue.trim();

    if (!searchValue) {
      this.loadingSpinner.removeLoadingSpinner('main');
      this.errorMessage.renderErrorMessage('A text input must be submitted to get search results.', 'main');
    }
    else {
      this.fetchSearchResults(searchValue);
    }
  }

  fetchSearchResults(searchValue) {
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchValue}&origin=*&format=json`)
    .then(response => {
      const searchResults = response.data.query.search;
      this.loadingSpinner.removeLoadingSpinner('main');

      if (searchResults.length !== 0) {
        this.resultsContainer.renderResultsContainer(searchResults, 'main');
      }
      else {
        this.errorMessage.renderErrorMessage(`Unable to find results for \"${searchValue}\". Consider revising your search.`, 'main');
      }
    }).catch(() => {
      this.loadingSpinner.removeLoadingSpinner('main');
      this.errorMessage.renderErrorMessage('Unable to load Wikipedia search results at this time.', 'main');
    });
  }

  // DOM methods
  renderSearchForm(location) {
    const searchForm = document.createElement('form');
    searchForm.setAttribute('role', 'search');
    searchForm.setAttribute('novalidate', 'true');
    searchForm.classList.add('search-form');
    searchForm.innerHTML = `
    <div class="form-group">
      <span class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></span>
      <input type="text" name="searchInput" class="search-input" aria-label="Search Wikipedia..." placeholder="Search Wikipedia..." id="search-input" autocomplete="off" autocapitalize="off" required autoFocus />
    </div>
    <div class="button-group">
      <button type="submit" class="button">Search</button>
      <a href="https://en.wikipedia.org/wiki/Special:Random" class="button" target="_blank">Random Article <span class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></span></a>
    </div>`;
    document.querySelector(location).appendChild(searchForm);
  }
}

export default SearchForm;