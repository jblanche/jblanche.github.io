$(document).ready(function(){
  //Temporarely disable Websockets since I'm not happy with them right now
  
  if (!Modernizr.cssanimations) {
   $('#css-text p').css('opacity', 1);
   $('#css-text span.typo').css('opacity', 1);
   $('#site-name').css('top', '0');
   $('#work').css('right', '0');
   $('#welcome').css('bottom', '0');
  }
});

