class ResultsContainer {
  // DOM methods
  renderResultsContainer(searchResults, location) {
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');
    resultsContainer.innerHTML = searchResults.map(resultItem => {
      return `<article class="result-item">
        <h2 id="article-title-${resultItem.pageid}">${resultItem.title}</h2>
        <p>${resultItem.snippet}...</p>
        <div class="button-group">
          <a href="https://en.wikipedia.org/wiki/${resultItem.title}" class="button" target="_blank" id="article-link-${resultItem.pageid}" aria-labelledby="article-link-${resultItem.pageid} article-title-${resultItem.pageid}">Continue Reading <span class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></span></a>
        </div>
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