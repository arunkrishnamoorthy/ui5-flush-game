sap.ui.define(["sap/ui/base/Object"],function(t){"use strict";var s;var e=[152,594,1052,154,593,1053];var i=[87,150,86,560,463,560];var a=false;var r=25;var n=20;return t.extend("flush.levels.whackabug",{constructor:function(t,s){this._oGame=t;this._oCanvas=s[0];this._boundKeyDown=this._fnKeyDown.bind(this);this._boundKeyUp=this._fnKeyUp.bind(this);this._keyboardInputX=0;this._keyboardInputY=0},init:function(){return new Promise(function(t,e){this._fnInitResolve=t;this.stage=new createjs.Stage(this._oCanvas.getId());var i=[{src:"bg.png",id:"bg"},{src:"Gut1.png",id:"gut1"},{src:"Gut2.png",id:"gut2"},{src:"Gut3.png",id:"gut3"},{src:"Gut4.png",id:"gut4"},{src:"Gut5.png",id:"gut5"},{src:"Gut6.png",id:"gut6"},{src:"Boese1.png",id:"boese1"},{src:"Boese2.png",id:"boese2"},{src:"hammer.png",id:"hammer"}];this.stage.mouseEventsEnabled=true;s=new createjs.LoadQueue(false);s.addEventListener("complete",this.onLoadingCompleted.bind(this));s.loadManifest(i,true,sap.ui.require.toUrl("flush/game/levels/WhackABug/assets")+"/");document.addEventListener("keydown",this._boundKeyDown);document.addEventListener("keyup",this._boundKeyUp)}.bind(this))},exit:function(){return new Promise(function(t,s){if(this.stage){this.stage.removeAllChildren();createjs.Ticker.removeAllEventListeners();createjs.Tween.removeAllTweens();this.stage=null}document.removeEventListener("keydown",this._boundKeyDown);document.removeEventListener("keyup",this._boundKeyUp);t()}.bind(this))},setDifficulty:function(t){this._iDifficulty=Math.min(t,50)},onLoadingCompleted:function(){var t=new createjs.Bitmap(s.getResult("bg"));this.stage.addChild(t);this.myCursor=new createjs.Bitmap(s.getResult("hammer"));this.myCursor.mouseEnabled=false;this.stage.addChild(this.myCursor);this.stage.mouseX=this._oCanvas.$().width()/2;this.stage.mouseY=this._oCanvas.$().height()/2;createjs.Ticker.timingMode=createjs.Ticker.RAF;createjs.Ticker.setInterval(25);createjs.Ticker.setFPS(40);createjs.Ticker.addEventListener("tick",createjs.Tween);createjs.Ticker.addEventListener("tick",function(t){this.stage.update();if(this._previousMouseX!==this.stage.mouseX){this.myCursor.x=this.stage.mouseX-120}else{this.myCursor.x+=this._keyboardInputX;this._keyboardInputX=0}if(this._previousMouseY!==this.stage.mouseY){this.myCursor.y=this.stage.mouseY-80}else{this.myCursor.y+=this._keyboardInputY;this._keyboardInputY=0}this._previousMouseX=this.stage.mouseX;this._previousMouseY=this.stage.mouseY;this.myCursor.x=Math.max(0,this.myCursor.x);this.myCursor.x=Math.min(this.myCursor.x,this._oCanvas.$().width()-75);this.myCursor.y=Math.max(0,this.myCursor.y);this.myCursor.y=Math.min(this.myCursor.y,this._oCanvas.$().height()-75);this.stage.setChildIndex(this.myCursor,this.stage.getNumChildren()-1)}.bind(this));this.stage.on("click",this._hammered.bind(this));this.showGoodBug();this.showBadBug();this._fnInitResolve()},_fnKeyDown:function(t){var s=t.key;if(s===" "||s==="Enter"){this.bugKeyboard();return}switch(s){case"ArrowLeft":case"a":this._iIntervalLeft=setInterval(function(){this._keyboardInputX-=r}.bind(this),n);break;case"ArrowRight":case"d":this._iIntervalRight=setInterval(function(){this._keyboardInputX+=r}.bind(this),n);break;case"ArrowUp":case"w":this._iIntervalUp=setInterval(function(){this._keyboardInputY-=r}.bind(this),n);break;case"ArrowDown":case"s":this._iIntervalDown=setInterval(function(){this._keyboardInputY+=r}.bind(this),n);break}},_fnKeyUp:function(t){switch(t.key){case"ArrowLeft":case"a":clearInterval(this._iIntervalLeft);break;case"ArrowRight":case"d":clearInterval(this._iIntervalRight);break;case"ArrowUp":case"w":clearInterval(this._iIntervalUp);break;case"ArrowDown":case"s":clearInterval(this._iIntervalDown);break}},_hammered:function(){createjs.Tween.get(this.myCursor).to({rotation:60,rotationDir:-1},100).to({rotation:30},100).to({rotation:10,rotationDir:-1},100)},bugKeyboard:function(){var t;this._hammered();var s=this.stage.getObjectsUnderPoint(this.myCursor.x+120,this.myCursor.y+80);for(var e=0;e<s.length;e++){if(s[e].image){t=[this.myCursor.x+120,this.myCursor.y+80];if(s[e].image.src.indexOf("Boese")>=0){this.badBugHit({rawX:t[0],rawY:t[1]})}else if(s[e].image.src.indexOf("Gut")>=0){this.goodBugHit({rawX:t[0],rawY:t[1]})}}}},showBadBug:function(){var t=Math.floor(Math.random()*e.length);if(t!==this.randomPos){if(this.lastBadBug!=null){this.lastBadBug.removeAllEventListeners();this.stage.removeChild(this.lastBadBug);this.lastBadBug=null}var r=Math.floor(Math.random()*2*Math.max(this._iDifficulty/10,1));this.badBug=new createjs.Bitmap(s.getResult("boese"+r));this.badBug.x=e[t];this.badBug.y=i[t]-(a?18:0);this.stage.addChild(this.badBug);this.badBug.on("click",this.badBugHit.bind(this));this.lastBadBug=this.badBug;this.lastBadBug.scaleY=.3;this.lastBadBug.y+=42;var n=4e3/(1.5+this._iDifficulty/5);createjs.Tween.get(this.lastBadBug).to({scaleY:1,y:i[t]-(a?18:0)},200).wait(n).call(function(){this.showBadBug()}.bind(this))}else{this.showBadBug()}},badBugHit:function(t){this._oGame.getSoundManager().play("hammer");this._oGame.triggerEvent("Awesome");this._oGame.score(100*this._iDifficulty/10,[t.rawX,t.rawY]);this.lastBadBug.removeAllEventListeners();this.stage.removeChild(this.lastBadBug);this.lastBadBug=null},showGoodBug:function(){if(this.lastBug!=null){this.lastBug.removeAllEventListeners();this.stage.removeChild(this.lastBug);this.lastBug=null}var t=Math.floor(Math.random()*6*Math.max(this._iDifficulty/10,1));this.randomPos=Math.floor(Math.random()*e.length);this.bug=new createjs.Bitmap(s.getResult("gut"+t));this.bug.x=e[this.randomPos];this.bug.y=i[this.randomPos];this.stage.addChild(this.bug);this.bug.on("click",this.goodBugHit.bind(this));this.lastBug=this.bug;this.lastBug.scaleY=.4;this.lastBug.y+=42;var a=6e3/(1+this._iDifficulty/4);createjs.Tween.get(this.lastBug).to({scaleY:1,y:i[this.randomPos]},200).wait(a).call(function(){this.showGoodBug()}.bind(this))},goodBugHit:function(t){this._oGame.getSoundManager().play("hammer");this._oGame.triggerEvent("Ohno");this._oGame.score(-100*this._iDifficulty/5,[t.rawX,t.rawY]);this.lastBug.removeAllEventListeners();this.stage.removeChild(this.lastBug);this.lastBug=null}})});