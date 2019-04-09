sap.ui.define(["sap/m/CustomTile","sap/ui/core/Icon","sap/m/CustomTileRenderer","sap/ui/thirdparty/jquery"],function(e,t,i){"use strict";return e.extend("flush.controls.GameTile",{metadata:{properties:{locked:{type:"boolean",defaultValue:true}},events:{press2:{}}},init:function(){this.addStyleClass("gameTile")},exit:function(){if(this._lockedIcon){this._lockedIcon.destroy();this._lockedIcon=null}},onBeforeRendering:function(){this.toggleStyleClass("locked",this.getLocked())},setLocked:function(e){this.setProperty("locked",e,true);this.$().find(".sapUiIcon").animate({opacity:e?1:0,top:e?"0":"-=50",height:e?"inherit":"toggle"},500,function(){this.$().find(".sapUiIcon").css("display",e?"block":"none");this.toggleStyleClass("locked",this.getLocked())}.bind(this))},ontap:function(e){if(!this.getLocked()){this.firePress()}},onsapenter:function(e){this.ontap(e)},onAfterRendering:function(){e.prototype.onAfterRendering.apply(this,arguments);this.$().append('<div class="locker"></div>');if(!this._lockedIcon){this._lockedIcon=new t({src:"sap-icon://locked",color:"#f2d249",size:"7rem",width:"200px",height:"190px"})}var i=sap.ui.getCore().createRenderManager(),n=this.$("cnt")[0];i.renderControl(this._lockedIcon);i.flush(this.$().find(".locker")[0]);i.destroy()},renderer:function(e,t){i.render(e,t)}})});