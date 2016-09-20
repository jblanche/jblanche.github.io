console.log('links v4', Date.now());
var smoothScroll = require('smoothscroll');
var delegate = require('delegate');

var menu = document.querySelector('.menu');
var entries = menu.querySelectorAll('li');

delegate(menu, 'li', 'click', function(e) {
  console.log(e.delegateTarget);
  entries.forEach(function (entry) {
    entry.classList.remove('current');
  })
  e.delegateTarget.classList.add('current');
  e.preventDefault();
}, false);

export var Links = {};
