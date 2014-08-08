/*! CloudKidFramework 0.0.1 */
!function(a){"use strict";var b={};Function.prototype.bind||(b.bind=Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=Array.prototype.slice.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(Array.prototype.slice.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(Array.prototype.slice.call(arguments)))};return d});for(var c=["ms","moz","webkit","o"],d=0;d<c.length&&!a.requestAnimationFrame;++d)a.requestAnimationFrame=a[c[d]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[d]+"CancelAnimationFrame"]||a[c[d]+"CancelRequestAnimationFrame"];if(!a.requestAnimationFrame){var e=0;a.requestAnimationFrame=function(b){var c=f(),d=Math.max(0,16-(c-e)),g=a.setTimeout(function(){b(c+d)},d);return e=c+d,g},a.cancelAnimationFrame=function(a){clearTimeout(a)}}b.requestAnimationFrame=a.requestAnimationFrame,a.requestAnimFrame=a.requestAnimationFrame,b.cancelAnimationFrame=a.cancelAnimationFrame;var f=a.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);f=f?f.bind(performance):Date.now?Date.now.bind(Date):function(){return(new Date).getTime()},b.now=f,namespace("cloudkid").FunctionUtils=b}(window),function(a,b){"use strict";function c(a){return null===a?String(a):"object"==typeof a||"function"==typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}var d=function(){},e=d.prototype;e._listeners=[],e.trigger=function(a,c){if(this._listeners[a]!==b)for(var d=this._listeners[a],e=0,f=d.length;f>e;e++)d[e](c)},e.on=function(a,b){if("object"===c(a))for(var d in a)a.hasOwnProperty(d)&&this.on(d,a[d]);else if("function"===c(b))for(var e=a.split(" "),f=null,g=0,h=e.length;h>g;g++)f=e[g],this._listeners[f]=this._listeners[f]||[],-1===this._listeners[f].indexOf(b)&&this._listeners[f].push(b);else if("array"===c(b))for(var i=0,j=b.length;j>i;i++)this.on(a,b[i]);return this},e.off=function(a,d){if(a===b)this._listeners=[];else if("array"===c(d))for(var e=0,f=d.length;f>e;e++)this.off(a,d[e]);else for(var g=a.split(" "),h=null,i=0,j=g.length;j>i;i++)if(h=g[i],this._listeners[h]=this._listeners[h]||[],d===b)this._listeners[h].length=0;else{var k=this._listeners[h].indexOf(d);-1!==k&&this._listeners[h].splice(k,1)}return this},e.has=function(a,b){if(!a||!b)return!1;var c=this._listeners[n];return c?c.indexOf(b)>=0:!1},namespace("cloudkid").EventDispatcher=d}(window),function(){var a=function(a){if(z)throw"Only one Application can be opened at a time";z=this,this.options=a||{},this.display=null,this._displays={},this._internalInit()},b=a.prototype=Object.create(EventDispatcher.prototype);a._globalInit=[],a._globalDestroy=[];var c=null,d=0,e=0,f=0,g=null,h=!1,i=-1,j=!1,k=0,l=0,m=null,n=1,o=null,p=null,q={raf:!0,fps:60,resizeElement:null,queryStringParameters:!1,debug:!1,minLogLevel:0,ip:null,canvasId:null,display:null,displayOptions:null},r={width:0,height:0},s="init",t="update",u="resize",v="pause",w="paused",x="resumed",y="destroy";a.registerInit=function(b){a._globalInit.push(b)},a.registerDestroy=function(b){a._globalDestroy.push(b)};var z=null;Object.defineProperty(a,"instance",{get:function(){return z}}),b._internalInit=function(){this.options.queryStringParameters&&A(this.options);for(var b in q)this.options.hasOwnProperty(b)||(this.options[b]=q[b]);for(var d=0;d<a._globalInit.length;++d)a._globalInit[d]();j=this.options.raf,this.fps=this.options.fps;var e=this.options.framerate;e&&(c="string"==typeof e?document.getElementById(e):e);var f=this.options.resizeElement;f&&(m="string"==typeof f?document.getElementById(e):e,this._resize=this._resize.bind(this),m.addEventListener("resize",this._resize)),void 0!==this.options.debug&&(Debug.enabled=this.options.debug===!0||"true"===this.options.debug),void 0!==this.options.minLogLevel&&(Debug.minLogLevel=parseInt(this.options.minLogLevel,10)),"string"==typeof this.options.ip&&Debug.connect(this.options.ip),o=new cloudkid.PageVisibility(this._onVisible.bind(this),this._onHidden.bind(this)),this.options.canvasId&&this.options.display&&this.addDisplay(this.options.canvasId,this.options.display,this.options.displayOptions),this.init&&this.init(),this.trigger(s),this._resize(),this.paused=!1};var A=function(a){var b=window.location.search;if(!b)return a;var c=b.substr(b.indexOf("?")+1),d=c.indexOf("#");c=0>d?c:c.substring(0,d);for(var e,f=c.split("&"),g=0;g<f.length;g++)e=f[g].split("="),Debug.log(e[0]+" -> "+e[1]),a[e[0]]=e[1];return a};b.init=null,b._onHidden=function(){this.paused=!0},b._onVisible=function(){this.paused=!1},Object.defineProperty(b,"paused",{get:function(){return h},set:function(a){h=!!a,this.trigger(v,h),this.trigger(h?w:x,h),h?-1!=i&&(j?cancelAnimationFrame(i):clearTimeout(i),i=-1):(-1==i&&(i=j?requestAnimFrame(g):B(g)),e=d=cloudkid.FunctionUtils.now())}});var B=function(a,b){var c=l;return b&&(c=Math.max(0,l-b)),setTimeout(a,c)};b._resize=function(){r.width=0|m.innerWidth,r.height=0|m.innerHeight,this.calculateDisplaySize(r),r.width|=0,r.height|=0;for(var a in p)p[a].resize(r.width,r.height);this.trigger(u,r.width,r.height)},b.calculateDisplaySize=function(a){a.width/a.height<n?a.height=a.width/n:a.width=a.height*n},b.addDisplay=function(a,b,c){if(p[a])return void Debug.error("A display already exists with the id of "+a);var d=p[a]=new b(a,c);this.display||(this.display=d,n=d.width/d.height)},b.getDisplay=function(a){return p[a]},b.getDisplays=function(){var a=[];for(var b in p)a.push(p[b]);return a},b.removeDisplay=function(a){var b=p[a];b&&(b.destroy(),delete p[a])},Object.defineProperty(b,"fps",{get:function(){return k},set:function(a){"number"==typeof a&&(k=a,l=1e3/k|0)}}),Object.defineProperty(b,"raf",{get:function(){return j},set:function(a){j=!!a}}),b._tick=function(){if(h)return void(i=-1);var a=cloudkid.FunctionUtils.now(),b=a-d;if(c){f++;var k=a-e;if(k>1e3){c.innerHTML="FPS: "+Math.round(1e3*_framerateValue)/1e3,e=a,f=0}}d=a,this.trigger(t,b);for(var l in p)p[l].render(b);i=j?requestAnimFrame(g):B(g,cloudkid.FunctionUtils.now()-d)},b.destroy=function(){this.paused=!0,this.trigger(y);for(var b in p)p[b].destroy();p=null;for(var d=0;d<a._globalDestroy.length;++d)a._globalDestroy[d]();m&&m.removeEventListener("resize",this._resize),c=m=null,o.destroy(),o=null,this._listeners=null},namespace("cloudkid").Application=a}(),function(a,b,c){"use strict";var d=function(a,b){this.initialize(a,b)},e=d.prototype,f=null;e._onFocus=null,e._onBlur=null,e._onToggle=null,b.hidden!==c?f="visibilitychange":b.mozHidden!==c?f="mozvisibilitychange":b.msHidden!==c?f="msvisibilitychange":b.webkitHidden!==c&&(f="webkitvisibilitychange"),e.initialize=function(c,d){if(f){this._onBlur=d,this._onFocus=c;var e=function(){b.hidden||b.webkitHidden||b.msHidden||b.mozHidden?d():c()};b.addEventListener(f,e,!1),a.addEventListener("pagehide",d),a.addEventListener("pageshow",c),a.addEventListener("blur",d),a.addEventListener("focus",c),a.addEventListener("visibilitychange",e,!1),this._onToggle=e}},e.destroy=function(){f&&(a.removeEventListener("pagehide",this._onBlur),a.removeEventListener("pageshow",this._onFocus),a.removeEventListener("blur",this._onBlur),a.removeEventListener("focus",this._onFocus),a.removeEventListener("visibilitychange",this._onToggle),b.removeEventListener(f,this._onToggle,!1),this._onFocus=null,this._onBlur=null)},namespace("cloudkid").PageVisibility=d}(window,document);