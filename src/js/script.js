const app = {
  init: function() {
  },
};

app.init();

const navbarSticky = function() {

  /* SOURCE */
  /* https://webgolovolomki.com/en/how-to-add-a-css-class-on-scroll/ */

  let scrollpos = window.scrollY;

  const header = document.querySelector('.splash');
  const scrollChange = 100;

  const add_class_on_scroll = () => header.classList.add('scroll');
  const remove_class_on_scroll = () => header.classList.remove('scroll');

  window.addEventListener('scroll', function() { 
    scrollpos = window.scrollY;

    if (scrollpos >= scrollChange) { add_class_on_scroll(); }
    else { remove_class_on_scroll(); }
    
  });
};

navbarSticky();