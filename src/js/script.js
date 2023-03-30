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

    console.log('activatePage');

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);

      if (page.id == pageId) console.log(page);

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
    
    const urlSongs = settings.db.url + '/' + settings.db.songs;
    const urlAuthors = settings.db.url + '/' + settings.db.authors;
    
    thisApp.data = {};
    thisApp.data.songs = {};
    thisApp.data.authors = {};
    
    Promise.all([
      fetch(urlSongs),
      fetch(urlAuthors),
    ])
      .then(function(rawResponses) {
        const songsResponse = rawResponses[0];
        const authorsResponse = rawResponses[1];
        return Promise.all([
          songsResponse.json(),
          authorsResponse.json(),
        ]);
      })
      .then(function(parsedResponses) {
        thisApp.data = parsedResponses;
      });
  },
  
  initHome: function() {
    const thisApp = this;
    
    const homeContainer = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeContainer);
  },
  
  init: function() {
    const thisApp = this;
    
    thisApp.initPages();
    thisApp.initData();
    thisApp.initHome();
  },
};

app.init();

// const navbarSticky = function() {

//   /* SOURCE */
//   /* https://webgolovolomki.com/en/how-to-add-a-css-class-on-scroll/ */

//   let scrollpos = window.scrollY;

//   const header = document.querySelector('.splash');
//   const scrollChange = 100;

//   const add_class_on_scroll = () => header.classList.add('scroll');
//   const remove_class_on_scroll = () => header.classList.remove('scroll');

//   window.addEventListener('scroll', function() { 
//     scrollpos = window.scrollY;

//     if (scrollpos >= scrollChange) { add_class_on_scroll(); }
//     else { remove_class_on_scroll(); }
    
//   });
// };

// navbarSticky();

const resizeSplashBg = () => {
  const bg = document.querySelector('.splash');
  
  window.addEventListener('scroll', () => {
    // bg.style.backgroundSize = 160 - +window.pageYOffset/12 + '%';
    bg.style.opacity = 1 - +window.pageYOffset/700;
  });
};

resizeSplashBg();