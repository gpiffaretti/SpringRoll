/**
 * @module PIXI Animation
 * @namespace springroll.pixi
 * @requires  Core, PIXI Display
 */
(function()
{
	// Include classes
	var Animator = include('springroll.pixi.Animator');

	/**
	 * Create an app plugin for Animator, all properties and methods documented
	 * in this class are mixed-in to the main Application
	 * @class AnimatorPlugin
	 * @extends springroll.ApplicationPlugin
	 */
	var plugin = mixin({}, 'springroll.ApplicationPlugin');	

	// Init the animator
	plugin.setup = function()
	{
		Animator.init();
		Animator.captions = this.captions || null;
	};

	// Destroy the animator
	plugin.teardown = function()
	{
		if (Animator) Animator.destroy();
	};

	// register plugin
	plugin.register();

}());