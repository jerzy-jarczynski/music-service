import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

const app = {
  initHero: function() {
    const thisApp = this;
    
    thisApp.hero = document.querySelector(select.hero);

    window.addEventListener('scroll', () => {
      thisApp.hero.style.opacity = 1 - +window.pageYOffset/700;
    });
  },
  
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
      
      let pageActive = '';
      
      switch (page.id) {
      case 'home':
        pageActive = classNames.home.active;
        break;
      case 'search':
        pageActive = classNames.search.active;
        break;
      case 'discover':
        pageActive = classNames.discover.active;
        break;
      }

      page.classList.toggle(pageActive, page.id == pageId);
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
      
        thisApp.initContent();
      });
  },

  customizeSongSource: function() {
    const thisApp = this;

    for (const song of thisApp.data.songs) {
      song.src = `./songs/${song.filename}`;
    }
  },
  
  initHome: function() {
    const thisApp = this;
    
    const homeContainer = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeContainer, thisApp.data);
  },
  
  initSearch: function() {
    const thisApp = this;
    
    const searchContainer = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(searchContainer, thisApp.data);
  },
  
  initDiscover: function() {
    const thisApp = this;
    
    const discoverContainer = document.querySelector(select.containerOf.discover);
    thisApp.discover = new Discover(discoverContainer, thisApp.data);
  },
  
  initContent: function() {
    const thisApp = this;
    
    thisApp.customizeSongSource();
    thisApp.initHome();
    thisApp.initSearch();
    thisApp.initDiscover();
  },
  
  init: function() {
    const thisApp = this;
    
    thisApp.initHero();
    thisApp.initPages();
    thisApp.initData();
  },
};

app.init();