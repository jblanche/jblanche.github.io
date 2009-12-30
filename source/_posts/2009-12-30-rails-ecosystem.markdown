---
title: The Rails ecosystem and community
layout: default
categories: ['blogpost']
tags: ['rails', 'ecosystem']
---

The Rails Ecosystem and Community ! 

I love the Rails framework, I immediately liked it the first time I tried to build a small app, with the good old Rails 1.1.1 (if my memory don't betrays me on this one).

But 5 years later, I have to admit that more than Rails itself, I love working with Rails because of the rails Ecosystem. 

Learning Rails, I learned about so much thing about the Web itself, Server Administration and all a lot of other stuff.
Let's make a quick tour of that : 

The first thing I discovered with Rails was the MVC architectural pattern, like many (if not all) things I gonna talk about in this blog post, I could have learn it in another way, and I can use it outside of Rails (and believe me, I will), but the fact is I needed Rails at this moment to discover the MVC pattern.

Well since MVC is good for writing web applications, let's take it part by part and see what I learnt for each one. 

The Model : 

  ORM was a great discovery, when I finally realized I could write plain old ruby code instead of writing ugly sql, dealing with SQL injections...
  Of course you have to know what's gonna happen behind this ruby code, but your studying years should have told you that, and believe me, you'll be happy not to write this stuff anymore ! 
  After a few years (3 I guess), of ActiveRecord happiness, I discovered Datamapper, and again, the Ruby/Rails community make me dig into this new brand new and shinning stuff with interest.
  
  And since a few month, the new hype are NoSQL DBMS (MongoDB, CouchDB...), again, this can be used outside of Rails, but it's really good to see a lot of ruby/rails related resources 
  talking about this stuff.  

The Controller : 

  Well, in fact ORM where for a long time the first reason I gave to the guys asking me about why I did the PHP/Rails switch.
  Is there anything interesting aside from the DB related stuff in rails ? 
  
  The answer is YES ! For sure : 
  
  Rails made me a HTTP fan. What but wait, HTTP is just a protocol, in PHP you get $_GET an $_POST, what would you like more ? 
  Well, with Rails, I discovered the REST software architecture.
  I discovered there was not 2 HTTP actions but 8 ! Yes 8 ! 
  OK Rails may not use all of them, but the RESTful hype made me understand a lot of thing about the HTTP protocol itself, and made my code a lot cleaner than ever.
   
  Learning Rails, I also discovered a lot about HTTP caching (expire header, etag) ...
  

The View : 
  Hey, that looks interesting but at the very end, you still have to write plain old HTML/CSS/Javascript stuff, and that my be the most time consuming part of my web developer job.
  Know what, you don't : 
  
  Of course you can write plain old HTML, CSS stuff, but if you don't like it, you can use the HAML/SASS couple and makes it a lot easier to write.
  Not enough ? Go on, use Compass, you'll be able to use all the goodness of CSS frameworks without polluting your HTML code with design related class names everywhere.
  Still not enough, Use formtastic, you're form have never been this easy to write and style ! 
  
  That's all for HTML/CSS, but the Rails also had great debates about Javascript. 
  LowPro, one of the first Behavioral Javascript Library was "Rails related".
  Rails 3 will be javascript framework agnostic and will allow you to write great pieces of software without polluting your HTML code with behavioral related JS (using HTML "data-" attributes)
  

You get the idea, learning Rails, you'll learn about a lot of Web related stuff you can reuse in any other project, in PHP, with Symfony for example, in Python, with Django... ... 
And that's why, after 5 years coding Rails applications, including 2 as a job, I'm still not pissed off about my job, and wake up every working day knowing I'm going to learn some new stuff during the day ! 

Even outside of the Web related stuff, I became a better network administrator during these years, learning stuff about caching mechanism (memcache), background jobs handling (Starling and then Resque with all the "Twitter and Rails" love or hate story), or Message Queuing servers (Kestrel) with the recent Github migration. 
Oh speaking of github, Git is again something else I discovered thanks to the rails community ! 

Whoa, that's king of a lot of things, just remember this : "Don't be a PHP-Ruby-Python-Java-Fortran-C developer", just code with the language you like, the one that makes you look at your code and say 'Cool, that's a good looking piece of code' , but even more important, be AWARE (like JC Van Damme would say [2]) of the community and ecosystem of your favorite language, you'll learn a lot ! 

[1] Note to the PHP fan guys, I know I could write pretty stuff with PHP, with good ORM... ... I just didn't know at that time !  
[2] This is for my french readers.