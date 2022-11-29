import { SearchForm } from './Search-Form';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>Wikipedia Viewer</h1>
    </header>
    <main>
      <div class="fab fa-wikipedia-w fa-4x"></div>
    </main>
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    SearchForm.renderForm();

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('.search-form') ? SearchForm.submitSearch(event, document.querySelector('.search-input').value) : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
