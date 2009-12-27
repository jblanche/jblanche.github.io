$(document).ready(function(){
    initiateWebSockets();
    aboutPage();
});


function aboutPage(){
  if($('#about').size == 0 ){
    return false ;
  }
  else{
    // hide every p that's not the first of his section.
  }
  
  //add behavior to show this content when the main section is clicked
  
  
  
}

function initiateWebSockets() {
  
  WebSocket.__swfLocation = "WebSocketMain.swf";
  
  var webSocket = new WebSocket('ws://localhost:8080/tweetnode');

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
    a({href: 'http://twitter.com' + tweet.user.screen_name + '/statuses/' + tweet.id  },
      tweet.text
    );
  });
}