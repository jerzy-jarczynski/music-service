// SETTINGS

export const select = {
  templateOf: {
    homeWidget: '#template-home-widget',
    audioPlayerWidget: '#template-song-widget',
    searchWidget: '#template-search-widget',
    searchbarWidget: '#template-searchbar-widget',
    discoverWidget: '#template-discover-widget',
  },
  containerOf: {
    pages: '.page',
    home: '.page__home',
    search: '.page__search',
    discover: '.page__discover',
  },
  nav: {
    links: '.menu__link',
    discover: 'a[href="#discover"]',
  },
  home: {
    songsList: '.songs',
    player: '.page__home .song__audio-player',
    banner: {
      wrapper: '.banner',
      before: '.banner::before',
      author: {
        wrapper: '.banner__author',
        lastname: '.banner__author--lastname',
        lnFirstHalf: '.banner__author--lastname-first-half',
        lnSecondHalf: '.banner__author--lastname-second-half',
      },
    },
  },
  search: {
    songsList: '.songs',
    result: '.page__communicate',
    searchbar: '.searchbar',
    player: '.page__search .song__audio-player',
  },
  searchbar: {
    input: 'input[type="text"]',
    button: '.button',
  },
  discover: {
    songs: '.songs',
    player: '.page__discover .song__audio-player',
  },
  hero: '.hero',
};

export const classNames = {
  nav: {
    active: 'menu__link--active',
  },
  banner: {
    visible: 'banner--visible',
  },
  home: {
    active: 'page__home--active',
  },
  search: {
    active: 'page__search--active',
  },
  discover: {
    active: 'page__discover--active',
  }
};

export const templates = {
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
  audioPlayerWidget: Handlebars.compile(document.querySelector(select.templateOf.audioPlayerWidget).innerHTML),
  searchWidget: Handlebars.compile(document.querySelector(select.templateOf.searchWidget).innerHTML),
  searchbarWidget: Handlebars.compile(document.querySelector(select.templateOf.searchbarWidget).innerHTML),
  discoverWidget: Handlebars.compile(document.querySelector(select.templateOf.discoverWidget).innerHTML),
};

export const settings = {
  db: {
    // url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    url: 'https://music-service-api-2.jerzy-jarczynski.repl.co',
    database: 'database',
  },
};