sap.ui.define(["sap/ui/core/Control","flush/controls/MessageToastDeluxe"],function(t){"use strict";return t.extend("flush.controls.MessageToastStory",{metadata:{properties:{random:{type:"boolean",defaultValue:false},delay:{type:"boolean",defaultValue:0},loop:{type:"boolean",defaultValue:false}},defaultAggregation:"steps",aggregations:{steps:{type:"flush.controls.MessageToastDeluxe",multiple:true}}},_shuffleArray:function(t){for(var e=t.length-1;e>0;e--){var s=Math.floor(Math.random()*(e+1));var i=t[e];t[e]=t[s];t[s]=i}},play:function(){var t=this.getAggregation("steps");if(this.isPlaying()){this.stop()}if(this.getRandom()){this._shuffleArray(t)}this._bStopped=false;this._playAll(t.reverse());this._oPlaying=new Promise(function(t,e){this._fnResolve=t}.bind(this));return this._oPlaying},isPlaying:function(){return!this._bStopped},stop:function(){this._bStopped=true;this._killLastToast();return this._oPlaying},_killLastToast:function(){var t=document.getElementsByClassName("sapMMessageToast");if(t.length){t.item(t.length-1).remove()}},_playAll:function(t){if(t.length===0||this._bStopped){if(this.getLoop()&&!this._bStopped){this.play()}if(!this._bStopped){this._fnResolve()}return}var e=t.pop();e.show().then(function(){if(this.getDelay()){setTimeout(function(){this._playAll(t)}.bind(this),this.getDelay())}else{this._playAll(t)}}.bind(this))}})});