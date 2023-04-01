export const select = {
  templateOf: {
    homeWidget: '#template-home-widget',
    audioPlayerWidget: '#template-song-widget',
    searchWidget: '#template-search-widget',
  },
  containerOf: {
    pages: '#pages',
    home: '#home',
    search: '#search',
  },
  nav: {
    links: '.main-nav a',
  },
  home: {
    songsList: '#songs-list',
    banner: {
      wrapper: '.banner',
      before: '.banner::before',
      author: {
        wrapper: '.author',
        lastname: '.lastname',
        lnFirstHalf: '.first-half',
        lnSecondHalf: '.second-half',
      },
    },
  },
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
  banner: {
    visible: 'visible',
  },
};

export const templates = {
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
  audioPlayerWidget: Handlebars.compile(document.querySelector(select.templateOf.audioPlayerWidget).innerHTML),
  searchWidget: Handlebars.compile(document.querySelector(select.templateOf.searchWidget).innerHTML),
};

export const settings = {
  db: {
    // url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    url: 'https://music-service-api-2.jerzy-jarczynski.repl.co',
    database: 'database',
  },
};