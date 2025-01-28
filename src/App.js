import Header from './modules/Header';
import Footer from './modules/Footer';
import SearchForm from './modules/SearchForm';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.searchForm = new SearchForm();
    this.renderApp();
  }

  // Event listeners
  events() {
    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('.search-form') ? this.searchForm.handleSubmit(event, document.querySelector('.search-input').value) : null;
    });
  }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.searchForm.renderSearchForm('main');
    this.events();
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `<div class="fab fa-wikipedia-w fa-4x" aria-hidden="true"></div>`;
    document.querySelector(location).appendChild(main);
  }
}

export default App;