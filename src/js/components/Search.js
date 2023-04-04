import { templates, select } from '../settings.js';
import Searchbar from './Searchbar.js';
import AudioPlayer from './AudioPlayer.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;
    
    thisSearch.songs = data.songs;
    thisSearch.authors = data.authors;
    
    thisSearch.render(element);
    thisSearch.initWidgets();
  }
  
  render(wrapper) {
    const thisSearch = this;
    
    thisSearch.dom = {};
    
    thisSearch.dom.wrapper = wrapper;
    
    const generatedHTML = templates.searchWidget();
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
    
    thisSearch.dom.searchbar = thisSearch.dom.wrapper.querySelector(select.search.searchbar);
    thisSearch.dom.result = thisSearch.dom.wrapper.querySelector(select.search.result);
    thisSearch.dom.songsList = thisSearch.dom.wrapper.querySelector(select.search.songsList);
  }
  
  initWidgets() {
    const thisSearch = this;
    
    thisSearch.searchbar = new Searchbar(thisSearch.dom.searchbar, thisSearch.songs);
    
    if (!thisSearch.searchbar.resultCount) {
      thisSearch.dom.result.innerHTML = 'Search through all songs...';

      for (const song of thisSearch.songs) {
        new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
      }
      
      // eslint-disable-next-line
      GreenAudioPlayer.init({
        selector: select.search.player, // inits Green Audio Player on each audio container that has class "player"
        stopOthersOnPlay: true,
      });
    }
    
    thisSearch.searchbar.dom.wrapper.addEventListener('search', function() {
      if (thisSearch.searchbar.resultCount == 1) {
        thisSearch.dom.result.innerHTML
        = `We have found ${thisSearch.searchbar.resultCount} song...`;  
      } else {
        thisSearch.dom.result.innerHTML
          = `We have found ${thisSearch.searchbar.resultCount} songs...`;
      }
      
      thisSearch.dom.songsList.innerHTML = '';
      
      for (const song of thisSearch.searchbar.searchResult) {
        new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
      }
      
      // eslint-disable-next-line
      GreenAudioPlayer.init({
        selector: select.search.player, // inits Green Audio Player on each audio container that has class "player"
        stopOthersOnPlay: true
      });
    });
  }
}

export default Search;