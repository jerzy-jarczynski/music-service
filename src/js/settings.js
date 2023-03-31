export const select = {
  templateOf: {
    homeWidget: '#template-home-widget',
    audioPlayerWidget: '#template-song-widget',
  },
  containerOf: {
    pages: '#pages',
    home: '#home',
  },
  nav: {
    links: '.main-nav a',
  },
  home: {
    songsList: '#songs-list',
    banner: '.banner',
  },
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
};

export const templates = {
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
  audioPlayerWidget: Handlebars.compile(document.querySelector(select.templateOf.audioPlayerWidget).innerHTML),
};

export const settings = {
  db: {
    // url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    url: 'https://music-service-api-2.jerzy-jarczynski.repl.co',
    database: 'database',
  },
};