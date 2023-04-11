import { templates } from '../settings.js';

class AudioPlayer {
  constructor(song, authors, wrapper) {
    const thisAudioPlayer = this;
    
    thisAudioPlayer.song = song;
    thisAudioPlayer.authors = authors;
    
    thisAudioPlayer.getAuthor();
    
    thisAudioPlayer.render(wrapper);
  }
  
  render(wrapper) {
    const thisAudioPlayer = this;
    
    thisAudioPlayer.dom = {};
    
    thisAudioPlayer.dom.wrapper = wrapper;
    
    const generatedHTML = templates.audioPlayerWidget(thisAudioPlayer.song);
    thisAudioPlayer.dom.wrapper.insertAdjacentHTML('beforeend', generatedHTML);
  }
  
  getAuthor() {
    const thisAudioPlayer = this;
    
    for (const author of thisAudioPlayer.authors) {
      if (author.id === thisAudioPlayer.song.author) {
        thisAudioPlayer.song.author = author;
      }
    }
  }
}

export default AudioPlayer;