sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter"],function(t,e,i){"use strict";return t.extend("flush.controller.Home",{formatter:i,onInit:function(){t.prototype.onInit.apply(this,arguments);var i=new e({instructions:""});this.setModel(i,"view");this.getRouter().getRoute("home").attachPatternMatched(this._onNavigation,this);this.getRouter().getTarget("home").attachDisplay(this._onNavigation,this);this.getRouter().attachRouteMatched(function(t){var e=t.getParameter("name");if(e!=="home"){clearTimeout(this._iIdleTimer);clearInterval(this._iFocusInterval)}}.bind(this))},_onNavigation:function(){this._controlWeather(arguments[0]);this._updateGame(arguments[0]);this._unlockLevels(arguments[0]);this._manageIdle(arguments[0]);this._ensureFocus(arguments[0])},_controlWeather:function(){this.ready().then(function(){if(!this.getSoundManager().isPlaying("thunderLightning")){this.getSoundManager().play("thunderLightning")}this.getBadWeather().rain("moderate");this.getBadWeather().lightning()}.bind(this))},_updateGame:function(){this.getModel("appView").setProperty("/mode","1player");this.ready().then(function(){var t=Math.min(this.getModel("appView").getProperty("/score"),1e4),e=this.getModel("appView").getProperty("/mood");var i=function(){this._playStory("randomQuotes")}.bind(this);if(t===1e4&&!this._bOutroPlayed){this._stopStory();this.getBadWeather().stop();this.getSoundManager().stop("thunderLightning");this._bOutroPlayed=true;this.getRouter().navTo("outro");return}var o=100-Math.max(0,t)/100;this.getModel("appView").setProperty("/mood",o);var n=this.getModel("appView").getProperty("/fromIntro");if(t<0||e!==o&&o!==0&&!n){if(e-o>0){this.getModel("appView").setProperty("/progress",this.getModel("appView").getProperty("/progress")+1);this._playStory("lucky").then(i);this.getSoundManager().play("Win").then(function(){this.getSoundManager().play("roboWin")}.bind(this))}else{this._playStory("fool").then(i);this.getSoundManager().play("Loose").then(function(){this.getSoundManager().play("roboLoose")}.bind(this))}clearTimeout(this._iLockTimer);this._bLockedAfterLevel=true;this._iLockTimer=setTimeout(function(){this._bLockedAfterLevel=false}.bind(this),3e3)}else{this.getModel("appView").setProperty("/fromIntro",false);this._playStory("intro").then(i)}}.bind(this))},_unlockLevels:function(){this.ready().then(function(){var t=this.getModel("appView"),e=t.getProperty("/progress");if(t.getProperty("/godMode")){e=99999999}var i=this.byId("levels").getTiles();for(var o=0;o<i.length;o++){(function(t){setTimeout(function(){var o=t>=e;i[t].setLocked(o);if(!o){i[t].focus()}}.bind(this),500+t*200)})(o)}}.bind(this))},_manageIdle:function(){clearTimeout(this._iIdleTimer);this._iIdleTimer=setTimeout(function(){this.onIntro()}.bind(this),this.getModel("appView").getProperty("/idleTimeReloopIntro"))},_ensureFocus:function(){clearInterval(this._iFocusInterval);var t=function(){var t=sap.ui.getCore().byId(document.activeElement.getAttribute("id"));if(!t||t.getMetadata().getName().split(".").pop()!=="GameTile"){this.byId("levels").getTiles()[0].focus()}}.bind(this);t();this._iFocusInterval=setInterval(t,2500)},onIntro:function(){this._stopStory();this.getRouter().navTo("intro")},onLevel:function(t){if(this._bLockedAfterLevel){return}this.getSoundManager().play("start");this.getBadWeather().stop();var e=t.getSource();var i=e.getCustomData()[0].getValue(),o=parseInt(e.getCustomData()[1].getValue());this._stopStory();this.getRouter().navTo("game",{level:i,difficulty:o})}})});