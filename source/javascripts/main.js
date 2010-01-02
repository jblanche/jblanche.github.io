$(document).ready(function(){
  initiateWebSockets();
  aboutPage();
});


function aboutPage(){
  $('.navigation').each(function () {
    var $links = $(this).find('a'),
      panelIds = $links.map(function() { return this.hash; }).get().join(","),
      $panels = $(panelIds),
      $panelwrapper = $panels.filter(':first').parent(),
      delay = 500,
      heightOffset = 0; // we could add margin-top + margin-bottom + padding-top + padding-bottom of $panelwrapper
    
    $panels.hide();
    
    $links.click(function () {
      var link = this, 
        $link = $(this);
    
      // ignore if already visible
      if ($link.parent().is('.selected')) {
        return false;
      }
    
      $links.parent().removeClass('selected');
      $link.parent().addClass('selected');
    
      document.title = 'Jblanche.fr - ' + $link.text();
    
      if ($.support.opacity) {
        $panels.stop().animate({opacity: 0 }, delay);
      }
    
      $panelwrapper.stop().animate({
        height: 0
      }, delay, function () {
        var height = $panels.hide().filter(link.hash).css('opacity', 1).show().height() + heightOffset;
    
        $panelwrapper.animate({
          height: height
        }, delay);
      });
    });
    $links.filter(window.location.hash ? '[hash=' + window.location.hash + ']' : ':first').click();
  });
}

function initiateWebSockets() {
  
  WebSocket.__swfLocation = "/WebSocketMain.swf";
  
  var webSocket = new WebSocket('ws://jblanche.fr:8080/tweetnode');

  webSocket.onopen = function(event){
    webSocket.send('start');
  };

  webSocket.onmessage = function(event){
    var last_tweet = JSON.parse(event.data);
    $.gritter.add({
    	title: Jaml.render('twitter-user', last_tweet),
    	text: Jaml.render('twitter-status', last_tweet),
    	image: last_tweet.user.profile_image_url,
    	sticky: false, 
    	time: 8000
    });
  };
  
  Jaml.register('twitter-user', function(tweet) {
    a({href: 'http://twitter.com/' + tweet.user.screen_name },
      tweet.user.screen_name
    );
  });

  Jaml.register('twitter-status', function(tweet) {
    a({href: 'http://twitter.com/' + tweet.user.screen_name + '/statuses/' + tweet.id  },
      tweet.text
    );
  });
}
