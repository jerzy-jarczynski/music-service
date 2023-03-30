import { templates } from '../settings.js';

class AudioPlayer {
  constructor(element) {
    const thisAudioPlayer = this;
    
    thisAudioPlayer.render(element);
  }
  
  render(wrapper) {
    const thisAudioPlayer = this;
    
    thisAudioPlayer.dom = {};
    
    thisAudioPlayer.dom.wrapper = wrapper;
    
    const generatedHTML = templates.audioPlayerWidget();
    thisAudioPlayer.dom.wrapper.innerHTML = generatedHTML;
    
    thisAudioPlayer.dom.wrapper = wrapper;
  }
}

export default AudioPlayer;