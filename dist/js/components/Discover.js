import { select, templates } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';

class Discover {
  constructor(element, data) {
    const thisDiscover = this;
    
    thisDiscover.songs = data.songs;
    thisDiscover.authors = data.authors;
    
    thisDiscover.render(element);
    thisDiscover.initWidgets();
  }
  
  render(wrapper) {
    const thisDiscover = this;
    
    thisDiscover.dom = {};
    
    thisDiscover.dom.wrapper = wrapper;
    
    const generatedHTML = templates.discoverWidget();
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
    
    thisDiscover.dom.songs = thisDiscover.dom.wrapper.querySelector(select.discover.songs);
  }
  
  initWidgets() {
    const thisDiscover = this;
    
    thisDiscover.songsLength = thisDiscover.songs.length;
    thisDiscover.randomIndex = Math.floor(Math.random() * thisDiscover.songsLength);
    
    document
      .querySelector(select.nav.discover)
      .addEventListener('click', function() {
        thisDiscover.dom.songs.innerHTML = '';
        new AudioPlayer(
          thisDiscover.getRandomSong(),
          thisDiscover.authors,
          thisDiscover.dom.songs
        );

        // eslint-disable-next-line
        new GreenAudioPlayer(select.discover.player);
      });
  }
  
  getRandomSong() {
    const thisDiscover = this;
    
    let randomIndex = Math.floor(Math.random() * thisDiscover.songsLength);
    
    while(randomIndex === thisDiscover.randomIndex) {
      randomIndex = Math.floor(Math.random() * thisDiscover.songsLength);
    }
    
    thisDiscover.randomIndex = randomIndex;
    
    return thisDiscover.songs[thisDiscover.randomIndex];
  }
}

export default Discover;