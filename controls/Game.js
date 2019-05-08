sap.ui.define(["sap/m/Page","sap/ui/Device","sap/ui/core/HTML","sap/m/Image","../controls/MessageToastDeluxe"],function(e,t,i,n,r){"use strict";var a=e.extend("flush.game.controls.Game",{metadata:{properties:{level:{type:"string",defaultValue:"Demo"},difficulty:{type:"int",defaultValue:1},score:{type:"int",defaultValue:0},timeLimit:{type:"int",defaultValue:0},player1Lives:{type:"int",defaultValue:0},player2Lives:{type:"int",defaultValue:0},player1Energy:{type:"float",defaultValue:0},player2Energy:{type:"float",defaultValue:0}},events:{init:{},end:{who:{type:"int"}},hit:{who:{type:"int"}},bomb:{who:{type:"int"}}}},init:function(){var e=new i(this.getId()+"-canvas",{content:'<canvas class="game sapMFocusable" width="'+(t.system.desktop?"1270px":t.resize.width)+'" height="'+(t.system.desktop?"720px":t.resize.height-120+"px")+'" tabindex="0"></canvas>'});this.addContent(e);var n=new i("debugCanvas",{content:'<canvas width="'+(t.system.desktop?"1270px":"100vw")+'" height="'+(t.system.desktop?"720px":t.resize.height-120+"px")+'" style="display:none"></canvas>'});this.addContent(n)},setLevel:function(e){this._updateCanvasSize();if(e){this.setProperty("level",e);this._loadLevel()}return this},getFocusDomRef:function(){return this.getContent()[0].$()[0]},_updateCanvasSize:function(){var e=document.getElementsByClassName("game")[0];if(e){e.setAttribute("width",t.system.desktop?"1270px":document.body.offsetWidth);e.setAttribute("height",t.system.desktop?"720px":document.body.offsetHeight-120+"px")}},_getRandomPosition:function(){var e=["begin","end"];var t=["top","center","bottom"];var i=Math.floor(Math.abs(Math.random())*e.length);var n=Math.floor(Math.abs(Math.random())*t.length);return e[i]+" "+t[n]},_timedGameLoop:function(){var e=parseInt(this.getModel("view").getProperty("/remainingTime")),t;if(!this._bLevelRunning){return}if(e===16){t=new r({number:"Hurry",image:"effect_points_negative.png",duration:1,position:"center center"});this.getParent().byId("remainingTime").setState("Warning")}else if(e===6){t=new r({number:"Panic",image:"effect_points_negative.png",duration:1,position:"center center"});this.getParent().byId("remainingTime").setState("Error")}else if(e===1){t=new r({number:"Over!",image:"effect_points_critical.png",duration:1,position:"center center"})}if(t){this.addDependent(t);t.show().then(function(){t.destroy()})}if(e<=0){this.getModel("view").setProperty("/remainingTime",0);this.end();if(this.getProperty("level").match(/multi/i)){var i=Math.max(0,this.getProperty("player1Lives"));var n=Math.max(0,this.getProperty("player2Lives"));if(i!==n){var a=i>n?1:2;this.fireEnd({who:a})}else{this.fireEnd()}}else{this.fireEnd()}return}this.getModel("view").setProperty("/remainingTime",this.getModel("view").getProperty("/remainingTime")-1);this._iLevelTimer=setTimeout(function(){this._timedGameLoop()}.bind(this),1e3)},_initMultiPlayer:function(){this.setProperty("player1Energy",0,true);this.setProperty("player2Energy",0,true);this._iMultiEnergyLoop=setInterval(function(){this.setProperty("player1Energy",Math.min(100,this.getPlayer1Energy()+.5),true);this.setProperty("player2Energy",Math.min(100,this.getPlayer2Energy()+.5),true)}.bind(this),80);this.setProperty("player1Lives",5,true);this.setProperty("player2Lives",5,true)},getPlayerEnergySegment:function(e){var t,i={1:16.5,2:33,3:49.5,4:66,5:82.5,6:99.9,7:101},n;if(e!==undefined){if(e===1){t=this.getPlayer1Energy()}else if(e===2){t=this.getPlayer2Energy()}}var r;var a=false;Object.keys(i).forEach(function(e){r=i[e];if(t<r&&!a){n=e;a=true}});return n},initTimeLimit:function(){this.getModel("view").setProperty("/remainingTime",this.getProperty("timeLimit"));this.getParent().byId("remainingTime").setState("None");this._bLevelRunning=true;this._timedGameLoop()},getSoundManager:function(){if(!this._oSoundManager){this._oSoundManager=this.getParent().getController().getSoundManager()}return this._oSoundManager},triggerEvent:function(e,t,i){switch(e){case"start":a=new r({number:"Fight!",image:"effect_points_critical.png",duration:1,position:"center center"});break;case"Awesome":var n=Math.random()>.3333?"effect_awesome.png":"effect_pow.png";if(Math.random()<=.3333){n="effect_plop.png"}var a=new r({message:"",image:n,duration:1,position:this._getRandomPosition()});this.getSoundManager().play("goodHit",undefined,undefined,.5);break;case"Ohno":var a=new r({message:"",image:"effect_ohno.png",duration:1e3,position:i?i[0]+" "+i[1]:"end center"});this.getSoundManager().play("badHit",undefined,undefined,.5);break;case"Haha":var a=new r({message:"",image:"effect_ha_ha_ha_neu.png",duration:1e3,position:i?i[0]+" "+i[1]:"end center"});if(!this.getSoundManager().isPlaying("devil")){this.getSoundManager().play("devil")}this.getSoundManager().play("badHit");break;case"Points":var a=new r({message:"",number:t,image:"effect_points.png",duration:1,jitter:100,position:i?i[0]+" "+i[1]:"begin center"});break;case"PointsNegative":var a=new r({message:"",number:t,image:"effect_points_negative.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"end center"});break;case"PointsCritical":var a=new r({message:"",number:t,image:"effect_points_critical.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"center center"});break;case"LowEnergy":var a=new r({message:"",number:t,image:"effect_lowenergy.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"center center"});break;case"Bomb":var a=new r({message:"",number:t,image:Math.random()<=.5?"effect_pow.png":"Boom.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"center center"});break;case"Laser":var a=new r({message:"",number:t,image:"Zing.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"begin center"});break;case"PickPhoenix":var s="CheckBox";switch(t){case 2:s="Switch";break;case 3:s="Button";break;case 4:s="Select";break;case 5:s="Progress";break;case 6:s="Slider";break;case 7:s="Tile";break}var a=new r({number:s,image:"effect_points_critical.png",duration:3,jitter:100,position:i?i[0]+" "+i[1]:"center center"});break}this.addDependent(a);a.show().then(function(){a.destroy()})},score:function(e,t){this.setProperty("score",this.getProperty("score")+e,true);if(e>=0){this.triggerEvent("Points",e,t)}else{this.triggerEvent("PointsNegative",e,t)}},hit:function(e){var t=Math.max(0,this.getProperty("player"+e+"Lives")-1);this.setProperty("player"+e+"Lives",t,true);this.triggerEvent("Haha",undefined,[e===1?"begin":"end","center"]);this.fireHit({who:e});if(t===0){this.end();this.fireEnd({who:e===1?2:1})}},hasBombEnergy:function(e){var t=this.getProperty("player"+e+"Energy");return t===100},bomb:function(e){var t=this.getProperty("player"+e+"Energy");if(t<100){this.triggerEvent("LowEnergy",undefined,[e===1?"begin":"end","center"])}else{this.setProperty("player"+e+"Energy",0,true);this.triggerEvent("Bomb",undefined,[e===1?"begin":"end","center"]);this.fireBomb({who:e})}},onBeforeRendering:function(){this.addStyleClass(this.getLevel())},onAfterRendering:function(){setTimeout(function(){this.focus()}.bind(this),0)},setTimeLimit:function(e){this.setProperty("timeLimit",e,true)},_loadLevel:function(){var e=this.getLevel(),t=this.getDifficulty();var i=function(){sap.ui.require(["flush/game/levels/"+e+"/Level"],function(e){var i=this.getParent();var n=i.byId(this.getId()+"-canvas");var r=sap.ui.getCore().byId("debugCanvas");var a=[n,r];this._oLevel=new e(this,a,i.byId("controlManager"));this._oLevel.setDifficulty(t);this._oLevel.init().then(function(){setTimeout(function(){this.triggerEvent("start")}.bind(this),1e3);if(this.getProperty("level").match(/multi/i)){this._initMultiPlayer()}this.fireInit();if(this.getTimeLimit()&&!this._bLevelRunning){this.initTimeLimit()}this._bLevelRunning=true}.bind(this))}.bind(this))}.bind(this);if(this._oLevel){this._bLevelRunning=false;clearTimeout(this._iLevelTimer);this._oLevel.exit().then(function(){this._oLevel.destroy();setTimeout(function(){i()},0)}.bind(this))}else{i()}},end:function(){this._bLevelRunning=false;clearTimeout(this._iLevelTimer);clearInterval(this._iMultiEnergyLoop);return this._oLevel.exit()},renderer:function(e,t){sap.m.PageRenderer.render(e,t)}});var s=a.prototype.invalidate;a.prototype.invalidate=function(e){if(e&&e.getMetadata().getName()==="flush.game.controls.ControlManager"){return}else{s.apply(this,arguments)}};return a});