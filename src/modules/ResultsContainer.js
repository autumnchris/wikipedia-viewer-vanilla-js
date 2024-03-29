class ResultsContainer {
  // DOM methods
  renderResultsContainer(searchResults, location) {
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');
    resultsContainer.innerHTML = searchResults.map(resultItem => {
      return `<article class="result-item">
        <h2>${resultItem.title}</h2>
        <p>${resultItem.snippet}...</p>
        <a href="https://en.wikipedia.org/wiki/${resultItem.title}" class="button" target="_blank">Continue Reading &raquo;</a>
      </article>`;
    }).join('');
    document.querySelector(location).appendChild(resultsContainer);
  }

  removeResultsContainer(location) {
    const resultsContainer = document.querySelector(`${location} .search-results`);
    resultsContainer ? document.querySelector(location).removeChild(resultsContainer) : null;
  }
}

export default ResultsContainer;