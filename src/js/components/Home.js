import { templates, select } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';

class Home {
  constructor(element) {
    const thisHome = this;
    
    thisHome.render(element);
    thisHome.initWidgets();
  }
  
  render(wrapper) {
    const thisHome = this;
    
    thisHome.dom = {};
    
    thisHome.dom.wrapper = wrapper;
    
    const generatedHTML = templates.homeWidget();
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    
    thisHome.dom.songsList = thisHome.dom.wrapper.querySelector(select.home.songsList);
  }
  
  initWidgets() {
    const thisHome = this;
    
    thisHome.audioPlayer = new AudioPlayer(thisHome.dom.songsList);
  }
}

export default Home;