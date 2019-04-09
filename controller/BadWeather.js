sap.ui.define(["sap/ui/base/Object"],function(t){"use strict";return t.extend("flush.game.controller.BadWeather",{init:function(t){this._oComponent=t;this._sMode=this._oComponent.getModel("game").getProperty("/mode")},stop:function(){if(this._sMode==="xmas"){this.stopSnow()}else{this.stopRain()}this.stopLightning()},stopRain:function(){if(this._sMode==="xmas"){return this.stopSnow()}else{this._bStopRain=true;var t=document.getElementById("rain");while(t.firstChild){t.removeChild(t.firstChild)}}},stopSnow:function(){document.getElementById("snow").classList.add("display-none");this._bstopSnow=true},stopLightning:function(){document.getElementById("lightning").classList.add("display-none")},lightning:function(){document.getElementById("lightning").classList.remove("display-none")},rain:function(t){if(this._sMode==="xmas"){return this.snow(t)}this._bStopRain=false;var e,n=window.innerWidth;switch(t){case"heavy":e=100;break;case"moderate":e=60;break;case"soft":default:e=30;break}function s(t,e){return Math.floor(Math.random()*(e-t+1))+t}for(i=1;i<e;i++){(function(t){setTimeout(function(){if(this._bStopRain){return}var e=s(-100,n);var i=s(-1e3,500);var o=document.getElementById("rain");var a=document.createElement("div");a.classList.add("drop");a.setAttribute("id","drop"+t);a.style.left=e+"px";a.style.top=i+"px";o.appendChild(a)}.bind(this),t*50)}).bind(this)(i)}},snow:function(t){this._bstopSnow=false;document.getElementById("snow").classList.remove("display-none");var e=document.getElementById("snow"),i=e.getContext("2d"),n=window.innerWidth,s=window.innerHeight,o=200,a=[];switch(t){case"heavy":o=150;break;case"moderate":o=100;break;case"soft":default:o=50;break}function h(t,e){var i=5,n=3;this.x=t;this.y=e;this.r=u(0,1);this.a=u(0,Math.PI);this.aStep=.01;this.weight=u(2,i);this.alpha=this.weight/i;this.speed=this.weight/i*n;this.update=function(){this.x+=Math.cos(this.a)*this.r;this.a+=this.aStep;this.y+=this.speed}}function r(){var t=o,e,i,r;while(t--){i=u(0,n,true);r=u(0,s,true);e=new h(i,r);a.push(e)}d();l()}function d(){e.width=n;e.height=s}var l=function(){var t=a.length,e;if(this._bstopSnow){return}i.save();i.setTransform(1,0,0,1,0,0);i.clearRect(0,0,n,s);i.restore();while(t--){e=a[t];e.update();i.beginPath();i.arc(e.x,e.y,e.weight,0,2*Math.PI,false);i.fillStyle="rgba(255, 255, 255, "+e.alpha+")";i.fill();if(e.y>=s){e.y=-e.weight}}requestAnimationFrame(l.bind(this))}.bind(this);function u(t,e,i){var n=Math.random()*(e-t+1)+t;if(i){return Math.floor(n)}else{return n}}r()}})});