#CloudKid Framework

A light-weight, extensible, future-forward framework for building HTML5 canvas-based games and applications. The framework is built on a display plugin architecture to work with [PixiJS](http://pixijs.org), [CreateJS](http://createjs.com) and native canvas rendering. The framework comes with several modules for doing common multimedia development tasks, such as:

* Adding Sound (WebAudio)
* Hardware Rendered Games (via WebGL)
* Implementing Captions
* Remote Debugging
* Responsive Interfaces
* Multi-threading
* Game State Management
* Preloading Assets
* Browser Cache Control

##Browser Support

The primary objective of the framework is to build content which supports WebAudio API and WebGL (with Context2d fallback). With the exception of the WebAudio API fallback to Flash, there are very few fallbacks implemented. We want to produce canvas content that is about the future. Here are the currently planned browser support:

* Internet Explorer 9+
* iOS Safari & iOS WebView 7+
* Chrome for Android 37+
* Chrome 30+
* Firefox 25+

We have intentionally avoided support for these browsers:
	
* Android stock browser (no WebAudio support or suitable fallback support)
* Internet Explorer 7/8 (no HTML5 canvas support)

##Installation

CloudKid Framework can be install using Bower.

```bash
bower install cloudkid-framework
```

##Examples

To test the examples, run the grunt task `examples`. This will download any dependencies and automatically launch the examples in your browser.

```bash
grunt examples
```

##Dependencies

* [PreloadJS](https://github.com/CloudKidStudio/PreloadJS) CloudKid's fork of PreloadJS

##Usage

The basic usage is to create a canvas element on the DOM, assign it an ID and then create a new Application to render that canvas.

```html
<html>
	<head>
		<!-- Core is required! -->
		<script src="dist/core.min.js"></script>

		<!-- Optional modules -->
		<script src="dist/modules/display-createjs.min.js"></script>
	</head>
	<body>
		<canvas id="stage" width="600" height="400"></canvas>
		<script>

			// Create the application
			var app = new cloudkid.Application({
				canvasId : "stage",
				display : cloudkid.CreateJSDisplay
			});

			// Listen for when the application
			// has been fully initialized
			app.on('init', function(){
				// Ready!
			});

		</script>
	</body>
</html>
```

##Modules

Modules are extra components which contain code libraries, documentation and/or related tools that can easily be bundled into a project. The goal of these modules is to provide convenient solutions to common problems producers face when authoring games. All modules are optional and contain functionality that can work along-size the core of the framework. These are found in the **dist/modules** folder.

* **[Captions Module](https://github.com/CloudKidStudio/CloudKidFramework/wiki/Captions-Module)**
* **CreateJS Display Module**
* **Native Display Module**
* **PIXI Display Module**
* **Interface Module** 
* **[Sound Module](https://github.com/CloudKidStudio/CloudKidFramework/wiki/Sound-Module)**
* **States Module**
* **Tasks Module**
* **Translate Module**
* **Worker Module**

##Displays

The Framework is inherently canvas-rendering agnostic. We support two different rendering display plugins for [CreateJS](http://createjs.com/) and [Pixi.js](http://www.pixijs.com/). In addition, there is a generic display for rendering using [Context2d](http://www.w3.org/TR/2014/CR-2dcontext-20140821/) or [WebGL](http://get.webgl.org/). An Application built with the Framework can support all there displays methods simultaneously.

##Documentation

[API Documentation](http://cloudkidstudio.github.io/CloudKidFramework/) has full documentation for the core and related modules. For examples of implementing each module please consult the [wiki](https://github.com/CloudKidStudio/CloudKidFramework/wiki).

##License

Copyright (c) 2014 [CloudKid](http://github.com/cloudkidstudio)

Released under the MIT License.