import { templates, select } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';

class Home {
  constructor(element, data) {
    const thisHome = this;
    
    thisHome.data = data;
    
    thisHome.render(element);
    thisHome.initWidgets();
    thisHome.resizeBannerBg();
  }
  
  render(wrapper) {
    const thisHome = this;
    
    thisHome.dom = {};
    
    thisHome.dom.wrapper = wrapper;
    
    const generatedHTML = templates.homeWidget();
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    
    thisHome.dom.songsList = thisHome.dom.wrapper.querySelector(select.home.songsList);
    thisHome.dom.banner = thisHome.dom.wrapper.querySelector(select.home.banner);
  }
  
  initWidgets() {
    const thisHome = this;
    
    for (let song of thisHome.data.songs) {
      new AudioPlayer(song, thisHome.data.authors, thisHome.dom.songsList);
    }
  }
  
  resizeBannerBg() {
    const thisHome = this;
    
    const body 
    = document.body,
      html = document.documentElement;

    const pageHeight 
    = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    const bannerHeight = thisHome.dom.banner.offsetHeight;
    
    console.log('pageHeight', pageHeight);
    console.log('bannerHeight', bannerHeight);
    
    window.addEventListener('scroll', () => {
      console.log(window.pageYOffset);
      console.log(pageHeight - bannerHeight);
      
      if (window.pageYOffset > (pageHeight - 2 * bannerHeight)) {
        thisHome.dom.banner.style.opacity = (window.pageYOffset - (pageHeight - 2 * bannerHeight))/500;
      }
    });
  }
}

export default Home;