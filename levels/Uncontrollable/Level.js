sap.ui.define(["sap/ui/base/Object","sap/ui/Device"],function(e,t){"use strict";var i,a,s,n,o,r,h,l,d,c,u,m,v;var y,g;var p=false;var _=30;var f=100;var b=20;var w=30;var x=60;var k=6;var T=t.system.phone?.7:1;var D;var L;var A;var M;var S;var B;var C;var P=[];var E;var O;var j=3;var G=true;var R={PLAYER:1,PLAYERBOTTOM:2,RENDERMANAGER:3,CONTROL:4};var I={POLYGON:1,CIRCLE:2};var Y;var F=[];var X=Box2D.Common.Math.b2Vec2;var N=Box2D.Dynamics.b2BodyDef;var V=Box2D.Dynamics.b2Body;var U=Box2D.Dynamics.b2FixtureDef;var W=Box2D.Dynamics.b2World;var $=Box2D.Collision.Shapes.b2PolygonShape;var q=Box2D.Collision.Shapes.b2CircleShape;var H=Box2D.Dynamics.b2DebugDraw;var Q=Box2D.Dynamics.b2ContactListener;var z={spawnGameObject:function(e,t,a){var s;if(e.spriteSheet){s=new createjs.Sprite(e.spriteSheet,e.spriteSheetAnimation);s.spriteSheetAnimation=e.spriteSheetAnimation}else if(e.assetId){s=new createjs.Bitmap(n.getResult(e.assetId))}else if(e.control){s=new createjs.Bitmap;s.image=e.control._image}if(e.width)s.width=e.width;if(e.height)s.height=e.height;if(e.x)s.x=e.x;if(e.y)s.y=e.y;if(e.regX){s.regX=e.regX}else{s.regX=parseInt(e.width/2)}if(e.regY){s.regY=e.regY}else{s.regY=parseInt(e.height/2)}if(e.scaleX)s.scaleX=e.scaleX;if(e.scaleY)s.scaleY=e.scaleY;if(e.control)s.control=e.control;if(e.assetId)s.assetId=e.assetId;if(e.snapToPixel)s.snapToPixel=e.snapToPixel;if(e.mouseEnabled)s.mouseEnabled=e.mouseEnabled;if(e.gameObjectType)s.gameObjectType=e.gameObjectType;if(e.shapeType)s.shapeType=e.shapeType;if(e.density)s.density=e.density;if(e.isStaticBody)s.isStaticBody=e.isStaticBody;if(e.gameObjectType==R.PLAYER){a=s;y=a}i.addChild(s);if(e.hasBox2dBody===true){return J.createGameObjectBodyAndActor(s,t)}return s}};var J=function(){var e=1,n=20,r=1/n;var D=Date.now();var S=0;var B=[];var j=[];var G=[];var z=true;var J=function(){Y=new W(new X(0,6),true);var i=new H;i.SetSprite(h);i.SetDrawScale(_);i.SetFillAlpha(.7);i.SetLineThickness(1);i.SetFlags(H.e_shapeBit|H.e_jointBit);Y.SetDebugDraw(i);var n=function(e){var i=e[0],a=e[1];if(Math.abs(g.GetLinearVelocity().y)<6&&g.GetPosition().y>(t.system.phone&&t.orientation.landscape?k/2:k)){g.ApplyForce(new X(0,a*f*5),g.GetPosition());E=Date.now();P.push(g.GetPosition().x);if(P.length>3){var s=0;for(var n=0;n<P.length-2;n++){s+=P[n+1]-P[n]}if(Math.abs(s)>2){O=Date.now();p=false}}if(P.length>10){P.shift()}}g.ApplyForce(new X(i*f,i*f),g.GetPosition());g.SetLinearDamping(.5);g.SetFixedRotation(true)};d=function(e){switch(e.key){case"ArrowLeft":case"a":this._movement[0]=-1;break;case"ArrowRight":case"d":this._movement[0]=1;break;case"ArrowUp":case"w":if(!L.getSoundManager().isPlaying("Raketenduese")){L.getSoundManager().play("Raketenduese",undefined,undefined,.5)}y.gotoAndPlay("fly");this._movement[1]=-1;break;case"ArrowDown":case"s":this._movement[0]=1;break;case" ":break;case"Enter":break}if(this._movement[0]||this._movement[1]){clearInterval(this._iIntervalMove);this._iIntervalMove=setInterval(function(){n(this._movement)}.bind(this),b)}}.bind(this);c=function(e){switch(e.key){case"ArrowLeft":case"a":this._movement[0]=0;clearInterval(this._iIntervalMove);break;case"ArrowRight":case"d":this._movement[0]=0;clearInterval(this._iIntervalMove);break;case"ArrowUp":case"w":L.getSoundManager().stop("Raketenduese");y.gotoAndPlay("run");this._movement[1]=0;clearInterval(this._iIntervalMove);break;case"ArrowDown":case"s":this._movement[0]=0;clearInterval(this._iIntervalMove);break;case" ":break;case"Enter":break}}.bind(this);this.shakeMagnet=function(){if(!this._bShakeRunning){this._bShakeRunning=true;createjs.Tween.get(l).to({scaleX:1.2,scaleY:1.2},50).to({rotation:l.rotation+25,rotationDir:-1},50).to({scaleX:1,scaleY:1},50).to({rotation:l.rotation},50).to({scaleX:.8,scaleY:.8},50).to({rotation:l.rotation+25,rotationDir:-1},50).to({scaleX:1,scaleY:1},50).to({rotation:l.rotation},50);setTimeout(function(){this._bShakeRunning=false}.bind(this),400)}}.bind(this);this.calculateMouseMovement=function(e){var t=e.offsetX||e.targetTouches[0].clientX;var i=e.offsetY||e.targetTouches[0].clientY;if(t<y.x+50){this._movement[0]=-1}else{this._movement[0]=1}if(i<y.y+50){this._movement[1]=-1;if(!L.getSoundManager().isPlaying("Raketenduese")){L.getSoundManager().play("Raketenduese",undefined,undefined,.5)}y.gotoAndPlay("fly")}else{this._movement[1]=1;L.getSoundManager().stop("Raketenduese");y.gotoAndPlay("run")}}.bind(this);u=function(e){if(this._bLastDownStillActive){return}setTimeout(function(){this._bLastDownStillActive=false}.bind(this),20);this._bLastDownStillActive=true;this._bMousePressed=true;this.shakeMagnet();this.calculateMouseMovement(e);if(this._movement[0]||this._movement[1]){clearInterval(this._iIntervalMove);n(this._movement);this._iIntervalMove=setInterval(function(){n(this._movement)}.bind(this),e.targetTouches?x:w)}if(!L.getSoundManager().isPlaying("shootingCharge1")){L.getSoundManager().play("shootingCharge1")}}.bind(this);m=function(e){if(this._bMousePressed){this.shakeMagnet();this.calculateMouseMovement(e)}}.bind(this);v=function(){this._bMousePressed=false;clearInterval(this._iIntervalMove);this._movement=[0,0];L.getSoundManager().stop("shootingCharge1");L.getSoundManager().stop("Raketenduese");y.gotoAndPlay("run")}.bind(this);this._movement=[0,0];document.addEventListener("keydown",d);document.addEventListener("keyup",c);o.addEventListener("mousedown",u);o.addEventListener("mousemove",m);o.addEventListener("mouseup",v);o.addEventListener("touchdown",u);o.addEventListener("touchmove",u);o.addEventListener("touchend",v);o.addEventListener("mousedown",u);o.addEventListener("mousemove",m);o.addEventListener("mouseup",v);o.addEventListener("touchdown",u);o.addEventListener("touchmove",u);o.addEventListener("touchend",v);var r=new Q;r.BeginContact=function(e){if(e.GetFixtureA().m_body.m_userData&&e.GetFixtureB().m_body.m_userData&&e.GetFixtureA().m_body.m_userData.skin&&e.GetFixtureB().m_body.m_userData.skin&&(e.GetFixtureA().m_body.m_userData.skin.gameObjectType===R.PLAYER&&!e.GetFixtureA().m_userData&&e.GetFixtureB().m_body.m_userData.skin.gameObjectType===R.CONTROL||e.GetFixtureB().m_body.m_userData.skin.gameObjectType===R.PLAYER&&!e.GetFixtureB().m_userData&&e.GetFixtureA().m_body.m_userData.skin.gameObjectType===R.CONTROL)){if(z){z=false;M=setTimeout(function(){z=true},500);L.score(-100*A/10,[g.GetPosition().x*_+25,g.GetPosition().y*_+25]);L.triggerEvent("Haha");C=Date.now()}}};Y.SetContactListener(r);var T=new U;T.density=.3;T.restitution=.5;T.shape=new $;T.shape.SetAsBox(a/_,e/_);var D=new N;D.type=V.b2_staticBody;D.position.x=0;D.position.y=s/_;var S=Y.CreateBody(D);S.CreateFixture(T);var B=new U;B.shape=new $;B.shape.SetAsBox(e/_,s/_);var j=new N;j.type=V.b2_staticBody;j.position.x=0;j.position.y=s/_;var G=Y.CreateBody(j);G.CreateFixture(B)};var K=function(e,t){this.body=e;this.skin=t;this.update=function(){this.skin.rotation=this.body.GetAngle()*(180/Math.PI);this.skin.x=this.body.GetWorldCenter().x*_;this.skin.y=this.body.GetWorldCenter().y*_};F.push(this)};var Z=function(e,t){var i=new U;i.density=e.density;i.restitution=.1;var a=new N;if(e.shapeType===I.POLYGON){i.shape=new $;if(e.gameObjectType===R.PLAYER){i.shape.SetAsBox(e.width/_/2,(e.height-30)/_/2)}else{i.shape.SetAsBox(e.width*T/_/2,e.height*T/_/2)}a.position.x=(e.x+e.width/2)/_;a.position.y=(e.y+e.height/2)/_}if(e.shapeType==I.CIRCLE){i.shape=new q(e.width/2/_);a.position.x=e.x/_;a.position.y=e.y/_}if(e.isStaticBody===true){a.type=V.b2_staticBody}else{a.type=V.b2_dynamicBody}var s=Y.CreateBody(a);s.skin=e;if(e.gameObjectType===R.PLAYER){t=s;g=t}if(e.gameObjectType===R.PLAYER){var n=new U;n.density=e.density;n.restitution=.1;n.shape=new $;n.shape.SetAsOrientedBox(e.width/_/2,1/_/2,new X(0,e.height/2/_));n.userData=true;s.CreateFixture(n)}var o=s.CreateFixture(i);o.skin=e;if(e.gameObjectType===R.CONTROL){var r=2*A/10;var h=Math.random()*r+1.5;s.ApplyImpulse(new X(-4*s.m_mass*h*T,-4.3*s.m_mass*h*.6*T*T),s.GetPosition())}var l=new K(s,e);s.SetUserData(l);if(e.gameObjectType===R.CONTROL||e.assetId==="ALVTable"){j.push(s)}else{G.push(s)}return s};var ee=function(e){if(e){i.removeChild(e.skin);F.splice(F.indexOf(e),1)}};var te=function(){var e=Date.now();var t=e-D;S+=t;D=e;while(S>=n){for(var i=0,a=B.length;i<a;i++){ee(B[i].GetUserData());B[i].SetUserData(null);Y.DestroyBody(B[i])}B=[];for(var i=0,a=F.length;i<a;i++){F[i].update()}Y.Step(r,10,10);S-=n;Y.ClearForces();Y.m_debugDraw.m_sprite.graphics.clear();Y.DrawDebugData();if(j.length>30){B.push(j[0]);j.splice(0,1)}}};var ie=function(e){if(e){r=0}else{r=1/n}D=Date.now()};return{setup:J,update:te,createGameObjectBodyAndActor:Z,pauseResume:ie}}();return e.extend("flush.game.levels.Uncontrollable",{constructor:function(e,t,i){L=e;this._oCanvas=t[0];this._oDebugCanvas=t[0];this._oControlManager=i},tick:function(e){if(Math.random()<.1){P.shift()}if(G){var n=e.delta/1e3;this._skyline1.x=this._skyline1.x-n*30;if(this._skyline1.x+this._skyline1.image.width*this._skyline1.scaleX<=0){this._skyline1.x=1238}if(this._skyline1.x<=-a){this._skyline1.x=0}this._skyline2.x=this._skyline2.x-n*30;if(this._skyline2.x+this._skyline2.image.width*this._skyline2.scaleX<=0){this._skyline2.x=1238}if(this._skyline2.x<=0){this._skyline2.x=a}var r=e.delta/1e3;this._hill1.x=this._hill1.x-r*60;if(this._hill1.x+this._hill1.image.width*this._hill1.scaleX<=0){this._hill1.x=1464}if(this._hill1.x<=-a){this._hill1.x=0}this._hill2.x=this._hill2.x-r*60;if(this._hill2.x+this._hill2.image.width*this._hill2.scaleX<=0){this._hill2.x=1464}if(this._hill2.x<=0){this._hill2.x=a}J.update();i.update();j++;var h=Math.floor(60-A*2);if(j%h===0){j=0;var d=this._oControlManager.getContent();var c=d[Math.floor(Math.abs(Math.random())*d.length)];if(t.system.phone){while(c.getMetadata().getName()==="sap.ui.unified.Calendar"||c.getMetadata().getName()==="sap.m.GenericTile"&&Math.random()*2<1.3){c=d[Math.floor(Math.abs(Math.random())*d.length)]}}L.getSoundManager().play("Controlshot");z.spawnGameObject({gameObjectType:R.CONTROL,shapeType:I.POLYGON,control:c,width:c._image.width,height:c._image.height,scaleX:T,scaleY:T,x:a,y:s-(t.system.phone?200:300),snapToPixel:true,mouseEnabled:false,density:1,isStaticBody:false,hasBox2dBody:true},this._playerBody,this._player)}}l.x=i.mouseX;l.y=i.mouseY;l.x=Math.max(0,l.x);l.x=Math.min(l.x,o.width-75);l.y=Math.max(0,l.y);l.y=Math.min(l.y,o.height-75);if(i.mouseX===0&&i.mouseY===0){l.x=-200;l.y=-200}var u=y.x+50-l.x-50;var m=y.y+75-l.y-80;l.rotation=Math.atan2(u,m*-1)*180/Math.PI;i.setChildIndex(l,i.getNumChildren()-1)},dropTable:function(){if(this._oALVTable){if(this._oALVTable.GetUserData()){i.removeChild(this._oALVTable.GetUserData().skin);F.splice(F.indexOf(this._oALVTable.GetUserData()),1)}this._oALVTable.SetUserData(null);Y.DestroyBody(this._oALVTable)}this._oALVTable=z.spawnGameObject({assetId:"ALVTable",shapeType:I.POLYGON,width:500,height:373,scaleX:T,scaleY:T,x:g.GetPosition().x*_-250,y:s-800,snapToPixel:true,mouseEnabled:false,density:15,isStaticBody:false,hasBox2dBody:true},this._playerBody,this._player);this._oALVTable.ApplyImpulse(new X(Math.random()*5,10),this._oALVTable.GetPosition())},init:function(){return new Promise(function(e,t){D=e;o=this._oCanvas.getDomRef();r=this._oDebugCanvas.getDomRef();h=r.getContext("2d");createjs.MotionGuidePlugin.install();i=new createjs.Stage(o);createjs.Touch.enable(i);i.snapPixelsEnabled=true;a=this._oCanvas.$().width();s=this._oCanvas.$().height();J.setup();var l=function(){S=setTimeout(function(){var e=Date.now()-C;var t=Date.now()-E;e=Math.floor(e/1e3);t=Math.floor(t/1e3);if(t<3&&e>0){L.score(Math.max(10,e*100*A/20),[g.GetPosition().x*_-25,g.GetPosition().y*_+25]);L.triggerEvent("Awesome")}l()},3e3)};E=Date.now()-3e3;C=Date.now()+3e3;l();var d=function(){B=setTimeout(function(){var e=(Date.now()-O)/1e3;if(e>3&&!p){L.triggerEvent("PointsCritical","Move!",[g.GetPosition().x*_-25,g.GetPosition().y*_+25]);p=true}if(e>6){setTimeout(function(){L.score(-1e3,[g.GetPosition().x*_-25,g.GetPosition().y*_+25]);L.triggerEvent("Ohno");O=Date.now()+5e3;p=false},1e3);this.dropTable();L.getSoundManager().play("devil");L.getSoundManager().play("shoot")}d()}.bind(this),3e3)}.bind(this);O=Date.now()+1e4;d();var c=sap.ui.require.toUrl("flush/game/levels/Uncontrollable/assets");n=new createjs.LoadQueue(false);n.on("complete",this.onLoadingCompleted,this);n.crossOrigin="";n.loadFile({id:"robot",src:c+"/robo.png"});n.loadFile({id:"skyline",src:c+"/skyline.png"});n.loadFile({id:"playerSprite",src:c+"/spritesheet_CodiFaehrtUndSpringt.png"});n.loadFile({id:"phoenix",src:c+"/phoenix.png"});n.loadFile({id:"cloud",src:c+"/clouds.png"});n.loadFile({id:"hill",src:c+"/hill.png"});n.loadFile({id:"ALVTable",src:c+"/ALVTable.png"});n.loadFile({id:"magnet",src:c+"/magnet.png"})}.bind(this))},onLoadingCompleted:function(){createjs.Ticker.addEventListener("tick",createjs.Tween);this._hill1=new createjs.Bitmap(n.getResult("hill"));this._hill1.width=1464;this._hill1.height=768;this._hill1.alpha=.1;this._hill1.x=0;this._hill1.y=s-this._hill1.height+80;i.addChild(this._hill1);this._hill2=new createjs.Bitmap(n.getResult("hill"));this._hill2.width=1464;this._hill2.height=768;this._hill2.alpha=.1;this._hill2.x=a+194;this._hill2.y=s-this._hill2.height+80;i.addChild(this._hill2);this._skyline1=new createjs.Bitmap(n.getResult("skyline"));this._skyline1.width=1238;this._skyline1.height=475;this._skyline1.alpha=.3;this._skyline1.x=0;this._skyline1.y=s-this._skyline1.height+7;i.addChild(this._skyline1);this._skyline2=new createjs.Bitmap(n.getResult("skyline"));this._skyline2.width=1238;this._skyline2.height=475;this._skyline2.alpha=.3;this._skyline2.x=a;this._skyline2.y=s-this._skyline2.height+7;i.addChild(this._skyline2);l=new createjs.Bitmap(n.getResult("magnet"));l.regX=52;l.regY=83;l.mouseEnabled=false;i.addChild(l);z.spawnGameObject({spriteSheet:new createjs.SpriteSheet({framerate:1,images:[n.getResult("playerSprite")],frames:{height:153,count:28,width:99,spacing:10},animations:{run:[0,0,"stay",1.5],jump:[20,26],fly:[27,27]}}),spriteSheetAnimation:"run",gameObjectType:R.PLAYER,shapeType:I.POLYGON,width:"99",height:"143",x:100,y:s-2e3,snapToPixel:true,mouseEnabled:false,density:1,isStaticBody:false,hasBox2dBody:true});this._robot=new createjs.Bitmap(n.getResult("robot"));this._robot.x=a-186;this._robot.y=s-143;i.addChild(this._robot);var e=new createjs.Bitmap(n.getResult("phoenix"));e.scaleX=-1;e.regY=250;e.regX=200;i.addChild(e);createjs.Tween.get(e).to({guide:{path:[-200,-200,0,200,400,200,600,200,800,-200]}},7e3);var t=new createjs.Bitmap(n.getResult("cloud"));t.y=-50;t.scaleX=1.240234375;t.alpha=.5;i.addChild(t);this._oControlManager.updateAllControlImages().then(function(){createjs.Ticker.setFPS(30);createjs.Ticker.addEventListener("tick",this.tick.bind(this));D();L.getSoundManager().play("Adlerschrei")}.bind(this))},exit:function(){return new Promise(function(e,t){if(i){i.removeAllChildren();createjs.Ticker.removeAllEventListeners();createjs.Tween.removeAllTweens();i=null}clearTimeout(M);clearTimeout(S);clearTimeout(B);document.removeEventListener("keydown",d);document.removeEventListener("keyup",c);o.removeEventListener("mousedown",u);o.removeEventListener("mousemove",m);o.removeEventListener("mouseup",v);o.removeEventListener("touchdown",u);o.removeEventListener("touchmove",m);o.removeEventListener("touchend",v);e()}.bind(this))},setDifficulty:function(e){A=Math.min(e,50)}})});