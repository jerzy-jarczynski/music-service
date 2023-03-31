import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';

const app = {
  initPages: function() {
    const thisApp = this;
    
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    const idFromHash = window.location.hash.replace('#/', '');
    
    let pageMatchingHash = thisApp.pages[0].id;
    
    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    
    thisApp.activatePage(pageMatchingHash);
    
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();

        /* Get page id from href Attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* Run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* Change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },
  
  activatePage: function(pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }  
  },
  
  initData: function() {
    const thisApp = this;
    
    const url = settings.db.url + '/' + settings.db.database;
    
    thisApp.data = {};
    
    fetch(url)
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(function(parsedResponse) {
        /* save parsedResponse as thisApp.data */
        thisApp.data = parsedResponse;
        thisApp.initHome();
      })
      .then(function() {
        // eslint-disable-next-line
        GreenAudioPlayer.init({
          selector: '.player', // inits Green Audio Player on each audio container that has class "player"
          stopOthersOnPlay: true
        });
      });
  },
  
  initHome: function() {
    const thisApp = this;
    
    const homeContainer = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeContainer, thisApp.data);
  },
  
  init: function() {
    const thisApp = this;
    
    thisApp.initPages();
    thisApp.initData();
  },
}

app.init();

const resizeSplashBg = () => {
  const bg = document.querySelector('.splash');
  
  window.addEventListener('scroll', () => {
    // bg.style.backgroundSize = 160 - +window.pageYOffset/12 + '%';
    bg.style.opacity = 1 - +window.pageYOffset/700;
  });
};

resizeSplashBg();