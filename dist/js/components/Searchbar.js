import { templates, select } from '../settings.js';

class Searchbar {
  constructor(element, data) {
    const thisSearchbar = this;
    
    thisSearchbar.data = data;
    
    thisSearchbar.render(element);
    thisSearchbar.initSearchbar();
  }
  
  render(wrapper) {
    const thisSearchbar = this;
    
    thisSearchbar.dom = {};
    
    thisSearchbar.dom.wrapper = wrapper;
    
    const generatedHTML = templates.searchbarWidget();
    thisSearchbar.dom.wrapper.insertAdjacentHTML('beforeend', generatedHTML);
    
    thisSearchbar.dom.input = thisSearchbar.dom.wrapper.querySelector(select.searchbar.input);
    thisSearchbar.dom.button = thisSearchbar.dom.wrapper.querySelector(select.searchbar.button);
  }
  
  initSearchbar() {
    const thisSearchbar = this;
    
    thisSearchbar.dom.button.addEventListener('click', function(event) {
      event.preventDefault();
      
      let searchPhrase = thisSearchbar.dom.input.value;
      
      if (searchPhrase !== '')
        thisSearchbar.getSearchResult(searchPhrase);
    });
  }
  
  getSearchResult(phrase) {
    const thisSearchbar = this;
    
    thisSearchbar.searchResult = [];
    thisSearchbar.resultCount = 0; 
    
    for (const song of thisSearchbar.data) {
      if (song.title.toLowerCase().includes(phrase.toLowerCase())) {
        thisSearchbar.searchResult.push(song);
      }
    }
    
    thisSearchbar.resultCount = thisSearchbar.searchResult.length;
    
    const event = new Event('search');
    
    thisSearchbar.dom.wrapper.dispatchEvent(event);
  }
}

export default Searchbar;