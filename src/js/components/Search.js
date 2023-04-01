import { templates } from '../settings.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;
    
    thisSearch.data = data;
    
    thisSearch.render(element);
  }
  
  render(wrapper) {
    const thisSearch = this;
    
    thisSearch.dom = {};
    
    thisSearch.dom.wrapper = wrapper;
    
    const generatedHTML = templates.searchWidget();
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default Search;