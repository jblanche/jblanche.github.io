$(document).ready(function(){
  WebSocket.__swfLocation = "WebSocketMain.swf";
  
  var webSocket = new WebSocket('ws://localhost:8080/tweetnode');

  webSocket.onopen = function(event){
      webSocket.send('start');
  };

  webSocket.onmessage = function(event){
    var last_tweet = JSON.parse(event.data);
    Jaml.register('tweet', function(tweet) {
      div(
        img({src: tweet.user.profile_image_url}),
        p({id: 'twitter-text'},
          tweet.text
        ),
        p({id: 'timing'},
          tweet.created_at
        )
      );
    });

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

    $.gritter.add({
    	title: Jaml.render('twitter-user', last_tweet),
    	text: Jaml.render('twitter-status', last_tweet),
    	image: last_tweet.user.profile_image_url,
    	sticky: false, 
    	time: 8000
    });

  };
});
