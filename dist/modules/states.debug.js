/*! CloudKidFramework 0.0.3 */
!function(){"use strict";var a,b=function(b){a=cloudkid.StateManager,this.initialize(b)},c=b.prototype;c.addEventListener=null,c.removeEventListener=null,c.removeAllEventListeners=null,c.dispatchEvent=null,c.hasEventListener=null,c._listeners=null,createjs.EventDispatcher&&createjs.EventDispatcher.initialize(c),c.stateId=null,c.manager=null,c.panel=null,c._destroyed=!1,c._active=!1,c._isLoading=!1,c._canceled=!1,c._onEnterStateProceed=null,c._onLoadingComplete=null,c._enabled=!1,c._isTransitioning=!1,c.initialize=function(a){this.panel=a},c.getCanceled=function(){return this._canceled},c._internalExitState=function(){this._isTransitioning&&(this._isTransitioning=!1,this.manager._display.Animator.stop(this.panel)),this._enabled=!1,this.panel.visible=!1,this._active=!1,this.exitState()},c.exitState=function(){},c._internalExitStateStart=function(){this.exitStateStart()},c.exitStateStart=function(){},c._internalEnterState=function(a){this._isTransitioning&&(this._isTransitioning=!1,this.manager._display.Animator.stop(this.panel)),this._enabled=!1,this._active=!0,this._canceled=!1,this._onEnterStateProceed=a,this.enterState(),this._onEnterStateProceed&&(this._onEnterStateProceed(),this._onEnterStateProceed=null)},c.loadingStart=function(){return this._isLoading?void Debug.warn("loadingStart() was called while we're already loading"):(this._isLoading=!0,this.manager.loadingStart(),this._onLoadingComplete=this._onEnterStateProceed,void(this._onEnterStateProceed=null))},c.loadingDone=function(){return this._isLoading?(this._isLoading=!1,this.manager.loadingDone(),void(this._onLoadingComplete&&(this._onLoadingComplete(),this._onLoadingComplete=null))):void Debug.warn("loadingDone() was called without a load started, call loadingStart() first")},c._internalCancel=function(){this._active=!1,this._canceled=!0,this._isLoading=!1,this._internalExitState(),this.cancel()},c.cancel=function(){},c.enterState=function(){},c._internalEnterStateDone=function(){this._canceled||(this.setEnabled(!0),this.enterStateDone())},c.enterStateDone=function(){},c.getActive=function(){return this._active},c.transitionIn=function(b){this._isTransitioning=!0;var c=this;this.manager._display.Animator.play(this.panel,a.TRANSITION_IN,function(){c._isTransitioning=!1,b()})},c.transitionOut=function(b){this._enabled=!1,this._isTransitioning=!0;var c=this;this.manager._display.Animator.play(this.panel,a.TRANSITION_OUT,function(){c._isTransitioning=!1,b()})},c.getDestroyed=function(){return this._destroyed},c.setEnabled=function(a){this._enabled=a},c.getEnabled=function(){return this._enabled},c.destroy=function(){this.exitState(),this.panel=null,this.manager=null,this._destroyed=!0,this._onEnterStateProceed=null,this._onLoadingComplete=null},namespace("cloudkid").BaseState=b}(),function(a){"use strict";var b=function(a,b,c){this.initialize(a,b,c)},c=b.prototype;b.TRANSITION_IN="onTransitionStateIn",b.TRANSITION_IN_DONE="onTransitionStateInDone",b.TRANSITION_OUT="onTransitionStateOut",b.TRANSITION_OUT_DONE="onTransitionStateOutDone",b.VISIBLE="onVisible",b.HIDDEN="onHidden",c.currentState=null,c.visibleState=null,c.type=null,c.initialize=function(b,c,d){this.type=b,this.visibleState=d===a?c:d,this.currentState=c},namespace("cloudkid").StateEvent=b}(),function(a){"use strict";var b=cloudkid.Audio||cloudkid.Sound,c=cloudkid.BaseState,d=cloudkid.StateEvent,e=createjs.EventDispatcher,f=function(a,b,c){this.initialize(a,b,c)},g=f.prototype;g.addEventListener=null,g.removeEventListener=null,g.removeAllEventListeners=null,g.dispatchEvent=null,g.hasEventListener=null,g._listeners=null,e&&e.initialize(g),f.VERSION="${version}",g._display=null,g._transition=null,g._transitionSounds=null,g._states=null,g._state=null,g._stateId=null,g._oldState=null,g._isLoading=!1,g._isTransitioning=!1,g._destroyed=!1,g._queueStateId=null,f.TRANSITION_IN="onTransitionIn",f.TRANSITION_IN_DONE="onTransitionInDone",f.TRANSITION_OUT="onTransitionOut",f.TRANSITION_OUT_DONE="onTransitionOutDone",f.TRANSITION_INIT_DONE="onInitDone",f.LOADING_START="onLoadingStart",f.LOADING_DONE="onLoadingDone",g.initialize=function(a,b,c){this._display=a,this._transition=b,this._transition.stop&&this._transition.stop(),this.hideBlocker(),this._states={},this._transitionSounds=c||null,this._loopTransition=this._loopTransition.bind(this)},g.addState=function(a,b){Debug.assert(b instanceof c,"State ("+a+") needs to subclass cloudkid.BaseState"),this._states[a]=b,b.stateId=a,b.manager=this,b._internalExitState()},g.changeTransition=function(a){this._transition=a},g.getState=function(){return this._stateId},g.getCurrentState=function(){return this._state},g.getStateById=function(b){return Debug.assert(this._states[b]!==a,"No alias matching "+b),this._states[b]},g.isBusy=function(){return this._isLoading||this._isTransitioning},g.loadingStart=function(){this._destroyed||(this.dispatchEvent(f.LOADING_START),this._loopTransition())},g.loadingDone=function(){this._destroyed||this.dispatchEvent(f.LOADING_DONE)},g.showBlocker=function(){this._display.enabled=!1},g.hideBlocker=function(){this._display.enabled=!0},g.refresh=function(){Debug.assert(!!this._state,"No current state to refresh!"),this.setState(this._stateId)},g.setState=function(b){if(Debug.assert(this._states[b]!==a,"No current state mattching id '"+b+"'"),this._isTransitioning)return void(this._queueStateId=b);this._stateId=b,this.showBlocker(),this._oldState=this._state,this._state=this._states[b];var c;this._oldState?this._isLoading?(this._oldState._internalCancel(),this._isLoading=!1,this._state._internalEnterState(this._onStateLoaded)):(this._isTransitioning=!0,this._oldState._internalExitStateStart(),this.showBlocker(),c=this,this.dispatchEvent(new d(d.TRANSITION_OUT,this._state,this._oldState)),this._oldState.transitionOut(function(){c.dispatchEvent(new d(d.TRANSITION_OUT_DONE,c._state,c._oldState)),c.dispatchEvent(f.TRANSITION_OUT),c._transitioning(f.TRANSITION_OUT,function(){c.dispatchEvent(f.TRANSITION_OUT_DONE),c._isTransitioning=!1,c.dispatchEvent(new d(d.HIDDEN,c._state,c._oldState)),c._oldState.panel.visible=!1,c._oldState._internalExitState(),c._oldState=null,c._loopTransition(),c._processQueue()||(c._isLoading=!0,c._state._internalEnterState(c._onStateLoaded.bind(c)))})})):(this._isTransitioning=!0,this._transition.visible=!0,c=this,this._loopTransition(),c.dispatchEvent(f.TRANSITION_INIT_DONE),c._isLoading=!0,c._state._internalEnterState(c._onStateLoaded.bind(c)))},g._onStateLoaded=function(){this._isLoading=!1,this._isTransitioning=!0,this.dispatchEvent(new d(d.VISIBLE,this._state)),this._state.panel.visible=!0,this.dispatchEvent(f.TRANSITION_IN);var a=this;this._transitioning(f.TRANSITION_IN,function(){a._transition.visible=!1,a.dispatchEvent(f.TRANSITION_IN_DONE),a.dispatchEvent(new d(d.TRANSITION_IN,a._state)),a._state.transitionIn(function(){a.dispatchEvent(new d(d.TRANSITION_IN_DONE,a._state)),a._isTransitioning=!1,a.hideBlocker(),a._processQueue()||a._state._internalEnterStateDone()})})},g._processQueue=function(){if(this._queueStateId){var a=this._queueStateId;return this._queueStateId=null,this.setState(a),!0}return!1},g._loopTransition=function(){var a;this._transitionSounds&&(a=this._transitionSounds.loop,b.instance.soundLoaded===!1&&(a=null)),this._display.Animator.instanceHasAnimation(this._transition,"transitionLoop")&&this._display.Animator.play(this._transition,"transitionLoop",{onComplete:this._loopTransition,soundData:a})},g.showTransitionOut=function(a){this.showBlocker();var b=this,c=function(){b._loopTransition(),a&&a()};this._transitioning(f.TRANSITION_OUT,c)},g.showTransitionIn=function(a){var b=this;this._transitioning(f.TRANSITION_IN,function(){b.hideBlocker(),a&&a()})},g._transitioning=function(a,c){var d=this._transition;d.visible=!0;var e;this._transitionSounds&&(e=a==f.TRANSITION_IN?this._transitionSounds.in:this._transitionSounds.out,b.instance.soundLoaded===!1&&(e=null)),this._display.Animator.play(this._transition,a,{onComplete:c,soundData:e})},g.destroy=function(){if(this._destroyed=!0,this._display.Animator.stop(this._transition),this._transition=null,this._state=null,this._oldState=null,this._states)for(var a in this._states)this._states[a].destroy(),delete this._states[a];this._states=null},namespace("cloudkid").StateManager=f}();