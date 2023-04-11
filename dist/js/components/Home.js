import { templates, select, classNames } from '../settings.js';
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
    
    const generatedHTML = templates.homeWidget(thisHome.getSubscribe());
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    
    thisHome.dom.songsList = thisHome.dom.wrapper.querySelector(select.home.songsList);
    thisHome.dom.banner = thisHome.dom.wrapper.querySelector(select.home.banner.wrapper);
    thisHome.dom.banner.before = window.getComputedStyle(thisHome.dom.banner, '::before');
    thisHome.dom.banner.author = thisHome.dom.wrapper.querySelector(select.home.banner.author.wrapper);
    thisHome.dom.banner.author.lastname = thisHome.dom.wrapper.querySelector(select.home.banner.author.lastname);
    thisHome.dom.banner.author.lnFirstHalf = thisHome.dom.wrapper.querySelector(select.home.banner.author.lnFirstHalf);
    thisHome.dom.banner.author.lnSecondHalf = thisHome.dom.wrapper.querySelector(select.home.banner.author.lnSecondHalf);
    
    thisHome.trimSubscribeLastname();
  }
  
  initWidgets() {
    const thisHome = this;
    
    for (let song of thisHome.data.songs) {
      console.log(song);
      new AudioPlayer(song, thisHome.data.authors, thisHome.dom.songsList);
    }
    
    // eslint-disable-next-line
    GreenAudioPlayer.init({
      selector: select.home.player,
      stopOthersOnPlay: true,
    });
  }
  
  getSubscribe() {
    const thisHome = this;
    
    const subscribeLength = thisHome.data.subscribe.length;
    
    const randomIndex = Math.floor(Math.random() * subscribeLength);
    
    return thisHome.data.subscribe[randomIndex];
  }
  
  trimSubscribeLastname() {
    const thisHome = this;
    
    const lastname = thisHome.dom.banner.author.lastname.getAttribute('data-name');
    
    const middle = Math.ceil(lastname.length / 2);
    const lnFirstHalf = lastname.slice(0, middle);
    const lnSecondHalf = lastname.slice(middle);
    
    thisHome.dom.banner.author.lnFirstHalf.innerHTML = lnFirstHalf;
    thisHome.dom.banner.author.lnSecondHalf.innerHTML = lnSecondHalf;
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
    
    let bannerBgOpacity = thisHome.dom.banner.before.getPropertyValue('opacity');
    
    window.addEventListener('scroll', () => { 
      if (window.pageYOffset > (pageHeight - 2 * bannerHeight)) {
        bannerBgOpacity = 1 - (window.pageYOffset - (pageHeight - 2 * bannerHeight))/500;
        
        thisHome.dom.banner.style.setProperty('--before-opcity', bannerBgOpacity);
        
        if (bannerBgOpacity < 0.5) {
          if (!thisHome.dom.banner.classList.contains(classNames.banner.visible))
            thisHome.dom.banner.classList.add(classNames.banner.visible);       
        } else {
          if (thisHome.dom.banner.classList.contains(classNames.banner.visible))
            thisHome.dom.banner.classList.remove(classNames.banner.visible);
        }
      }
    });
  }
}

export default Home;