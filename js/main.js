/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _links = __webpack_require__(4);

	var _links2 = _interopRequireDefault(_links);

	var _lightbox = __webpack_require__(9);

	var _lightbox2 = _interopRequireDefault(_lightbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var smoothScroll = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, smoothScroll) {
	  'use strict';

	  // Support RequireJS and CommonJS/NodeJS module formats.
	  // Attach smoothScroll to the `window` when executed as a <script>.

	  // RequireJS
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (smoothScroll), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // CommonJS
	  } else if (typeof exports === 'object' && typeof module === 'object') {
	    module.exports = smoothScroll();

	  } else {
	    root.smoothScroll = smoothScroll();
	  }

	})(this, function(){
	'use strict';

	// Do not initialize smoothScroll when running server side, handle it in client:
	if (typeof window !== 'object') return;

	// We do not want this script to be applied in browsers that do not support those
	// That means no smoothscroll on IE9 and below.
	if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return; }

	// Get the top position of an element in the document
	var getTop = function(element) {
	    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
	    if(element.nodeName === 'HTML') return -window.pageYOffset
	    return element.getBoundingClientRect().top + window.pageYOffset;
	}
	// ease in out function thanks to:
	// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
	var easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

	// calculate the scroll position we should be in
	// given the start and end point of the scroll
	// the time elapsed from the beginning of the scroll
	// and the total duration of the scroll (default 500ms)
	var position = function(start, end, elapsed, duration) {
	    if (elapsed > duration) return end;
	    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
	    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
	}

	// we use requestAnimationFrame to be called by the browser before every repaint
	// if the first argument is an element then scroll to the top of this element
	// if the first argument is numeric then scroll to this location
	// if the callback exist, it is called when the scrolling is finished
	// if context is set then scroll that element, else scroll window 
	var smoothScroll = function(el, duration, callback, context){
	    duration = duration || 500;
	    context = context || window;
	    var start = window.pageYOffset;

	    if (typeof el === 'number') {
	      var end = parseInt(el);
	    } else {
	      var end = getTop(el);
	    }

	    var clock = Date.now();
	    var requestAnimationFrame = window.requestAnimationFrame ||
	        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
	        function(fn){window.setTimeout(fn, 15);};

	    var step = function(){
	        var elapsed = Date.now() - clock;
	        if (context !== window) {
	        	context.scrollTop = position(start, end, elapsed, duration);
	        }
	        else {
	        	window.scroll(0, position(start, end, elapsed, duration));
	        }

	        if (elapsed > duration) {
	            if (typeof callback === 'function') {
	                callback(el);
	            }
	        } else {
	            requestAnimationFrame(step);
	        }
	    }
	    step();
	}

	var linkHandler = function(ev) {
	    ev.preventDefault();

	    if (location.hash !== this.hash) window.history.pushState(null, null, this.hash)
	    // using the history api to solve issue #1 - back doesn't work
	    // most browser don't update :target when the history api is used:
	    // THIS IS A BUG FROM THE BROWSERS.
	    // change the scrolling duration in this call
	    smoothScroll(document.getElementById(this.hash.substring(1)), 500, function(el) {
	        location.replace('#' + el.id)
	        // this will cause the :target to be activated.
	    });
	}

	// We look for all the internal links in the documents and attach the smoothscroll function
	document.addEventListener("DOMContentLoaded", function () {
	    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'), a;
	    for(var i=internal.length; a=internal[--i];){
	        a.addEventListener("click", linkHandler, false);
	    }
	});

	// return smoothscroll API
	return smoothScroll;

	});


/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var MiniLightbox = __webpack_require__(10);

	console.log(MiniLightbox);
	MiniLightbox({
	    selector: ".screenshots img"
	    // the common container where the images are appended
	    , delegation: "html"
	});

	MiniLightbox.customClose = function () {
	    var self = this;
	    self.img.classList.add("animated", "fadeOutDown");
	    setTimeout(function () {
	        self.box.classList.add("animated", "fadeOut");
	        setTimeout(function () {
	            self.box.classList.remove("animated", "fadeOut");
	            self.img.classList.remove("animated", "fadeOutDown");
	            self.box.style.display = "none";
	        }, 500);
	    }, 500);
	    return false;
	};

	MiniLightbox.customOpen = function () {
	    this.box.classList.add("animated", "fadeIn");
	    this.img.classList.add("animated", "fadeInUp");
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var cache;

	if (global.addEventListener) {
	    global.addEventListener("scroll", function () {
	        MiniLightbox.close();
	    });

	    global.addEventListener("keydown", function (e) {
	        if (e.which !== 27) {
	            return;
	        }
	        MiniLightbox.close();
	    });
	}

	function matchesSelector(selector, element) {
	    var all = document.querySelectorAll(selector);
	    for (var i = 0; i < all.length; i++) {
	        if (all[i] === element) {
	            return true;
	        }
	    }
	    return false;
	}

	/**
	 * MiniLightbox
	 *
	 * Initializes the lightbox according to the options.
	 *
	 * **Callbacks**:
	 *
	 * The following methods can be used to modify the default behavior:
	 *
	 *  - `Minilightbox.customOpen` (Function): If it's a function, it will be
	 *    called then the lightbox is opened. If it returns `false`, the default
	 *    behavior will be prevented.
	 *  - `Minilightbox.customClose` (Function): If it's a function, it will be
	 *    called then the lightbox is closed. If it returns `false`, the default
	 *    behavior will be prevented.
	 *
	 * @name MiniLightbox
	 * @function
	 * @param {Object} options An object containing the following fields:
	 *
	 *  - `selector` (String): The image query selector.
	 *  - `delegation` (String): The image container where to handle the delegation.
	 *
	 */
	function MiniLightbox(options) {
	    var selector = options.selector || options,
	        elms = document.querySelectorAll(selector),
	        clickHandler = function clickHandler(e) {
	        var id = this.id,
	            fCache = cache[id],
	            box,
	            img;

	        if (!id) {
	            this.setAttribute("id", id = "ml_" + Math.random().toString(36));
	        }

	        if (fCache) {
	            MiniLightbox.open(id);
	        } else {
	            box = document.createElement("div");
	            box.setAttribute("class", "ml_box");
	            img = document.createElement("img");
	            img.setAttribute("src", this.getAttribute("data-image-opened") || this.src);
	            box.appendChild(img);

	            box.addEventListener("click", function () {
	                MiniLightbox.close(id);
	            });

	            cache[id] = {
	                el: this,
	                box: box,
	                img: img,
	                opened: false
	            };

	            document.body.appendChild(box);
	            MiniLightbox.open(id);
	        }

	        e.preventDefault();
	    },
	        i;

	    for (i = 0; i < elms.length; ++i) {
	        new Image(elms[i].getAttribute("data-image-opened"));
	    }

	    if (options.delegation) {
	        return document.querySelector(options.delegation).addEventListener("click", function (e) {
	            var el = e.target;
	            var parents = [el];
	            while (el) {
	                parents.push(el = el.parentNode);
	            }
	            for (i = 0; i < parents.length; ++i) {
	                var cPar = parents[i];
	                if (matchesSelector(options.selector, cPar) && (el = cPar)) {
	                    break;
	                }
	            }

	            if (!el || el.tagName !== 'IMG' || el.parentNode.classList.contains("ml_box")) {
	                return;
	            }
	            clickHandler.call(el, e);
	        });
	    }

	    for (i = 0; i < elms.length; ++i) {
	        (function (cEl) {
	            cEl.addEventListener("click", clickHandler);
	        })(elms[i]);
	    }
	}

	/**
	 * close
	 * Closes the lightboxes.
	 *
	 * @name close
	 * @function
	 * @param {String} id The lightbox id. If not provided, it will close all the opened lightboxes.
	 */
	MiniLightbox.close = function (id) {
	    if (!id) {
	        var ids = Object.keys(cache);
	        for (var i = 0; i < ids.length; ++i) {
	            MiniLightbox.close(ids[i]);
	        }
	        return;
	    }
	    if (!cache[id].opened) {
	        return;
	    }
	    cache[id].opened = false;

	    if (typeof MiniLightbox.customClose === "function" && MiniLightbox.customClose.call(cache[id]) === false) {
	        return;
	    }

	    cache[id].box.style.display = "none";
	};

	/**
	 * open
	 * Opens the lightbox. This is called internally.
	 *
	 * @name open
	 * @function
	 * @param {String} id The lightbox id.
	 */
	MiniLightbox.open = function (id) {
	    if (cache[id].opened) {
	        return;
	    }
	    cache[id].opened = true;
	    if (typeof MiniLightbox.customOpen === "function" && MiniLightbox.customOpen.call(cache[id]) === false) {
	        return;
	    }
	    cache[id].box.style.display = "block";
	};

	cache = MiniLightbox._cache = {};

	module.exports = MiniLightbox;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);