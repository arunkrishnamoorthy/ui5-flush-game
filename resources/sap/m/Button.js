/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/ContextMenuSupport","sap/ui/core/library","./ButtonRenderer","sap/ui/events/KeyCodes"],function(t,e,i,n,o,s,r,a,c){"use strict";var u=r.TextDirection;var p=t.ButtonType;var l=e.extend("sap.m.Button",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:p.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:u.Inherit}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},press:{}},designtime:"sap/m/designtime/Button.designtime",dnd:{draggable:true,droppable:false}}});i.call(l.prototype);s.apply(l.prototype);l.prototype.init=function(){this._onmouseenter=this._onmouseenter.bind(this)};l.prototype.exit=function(){if(this._image){this._image.destroy()}if(this._iconBtn){this._iconBtn.destroy()}this.$().off("mouseenter",this._onmouseenter)};l.prototype.onBeforeRendering=function(){this._bRenderActive=this._bActive;this.$().on("mouseenter",this._onmouseenter)};l.prototype.onAfterRendering=function(){if(this._bRenderActive){this._activeButton();this._bRenderActive=this._bActive}this.$().on("mouseenter",this._onmouseenter)};l.prototype.ontouchstart=function(t){t.setMarked();if(this._bRenderActive){delete this._bRenderActive}if(t.targetTouches.length===1){this._activeButton()}if(this.getEnabled()&&this.getVisible()){if(o.browser.safari&&(t.originalEvent&&t.originalEvent.type==="mousedown")){this.focus();t.preventDefault()}}};l.prototype.ontouchend=function(t){this._inactiveButton();if(this._bRenderActive){delete this._bRenderActive;if(t.originalEvent&&t.originalEvent.type in{mouseup:1,touchend:1}){this.ontap(t)}}};l.prototype.ontouchcancel=function(){this._inactiveButton()};l.prototype.ontap=function(t){t.setMarked();if(this.getEnabled()&&this.getVisible()){if(t.originalEvent&&t.originalEvent.type==="touchend"){this.focus()}this.fireTap({});this.firePress({})}};l.prototype.onkeydown=function(t){if(t.which===c.SPACE||t.which===c.ENTER){t.setMarked();this._activeButton()}if(t.which===c.ENTER){this.firePress({})}};l.prototype.onkeyup=function(t){if(t.which===c.SPACE||t.which===c.ENTER){t.setMarked();this._inactiveButton()}if(t.which===c.SPACE){this.firePress({})}};l.prototype._onmouseenter=function(t){if(t.originalEvent&&t.originalEvent.buttons&1){this._activeButton()}};l.prototype.onfocusout=function(){this._inactiveButton()};l.prototype._activeButton=function(){if(!this._isUnstyled()){this.$("inner").addClass("sapMBtnActive")}this._bActive=this.getEnabled();if(this._bActive){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getActiveIcon())}}};l.prototype._inactiveButton=function(){if(!this._isUnstyled()){this.$("inner").removeClass("sapMBtnActive")}this._bActive=false;if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getIcon())}}};l.prototype._isHoverable=function(){return this.getEnabled()&&o.system.desktop};l.prototype._getImage=function(t,e,i,o){if(this._image&&this._image.getSrc()!==e){this._image.destroy();this._image=undefined}var s=this._image;var r=this.getIconFirst();if(!!s){s.setSrc(e);if(s instanceof sap.m.Image){s.setActiveSrc(i);s.setDensityAware(o)}}else{s=n.createControlByURI({id:t,src:e,activeSrc:i,densityAware:o,useIconTooltip:false},sap.m.Image).addStyleClass("sapMBtnCustomIcon").setParent(this,null,true)}s.addStyleClass("sapMBtnIcon");s.toggleStyleClass("sapMBtnIconLeft",r);s.toggleStyleClass("sapMBtnIconRight",!r);this._image=s;return this._image};l.prototype._getInternalIconBtn=function(t,e){var i=this._iconBtn;if(i){i.setSrc(e)}else{i=n.createControlByURI({id:t,src:e,useIconTooltip:false},sap.m.Image).setParent(this,null,true)}i.addStyleClass("sapMBtnIcon");i.addStyleClass("sapMBtnIconLeft");this._iconBtn=i;return this._iconBtn};l.prototype._isUnstyled=function(){var t=false;if(this.getType()===p.Unstyled){t=true}return t};l.prototype.setText=function(t){var e=this.getText();if(t===null||t===undefined){t=""}if(e!==t){var i=this.getDomRef("BDI-content")||this.getDomRef("content");var n=!!i;this.setProperty("text",t,n);if(n){t=this.getText();i.textContent=t;this.$("inner").toggleClass("sapMBtnText",!!t)}}return this};l.prototype.setIcon=function(t){var e=this.getIcon()||"";t=t||"";if(e!==t){var i=!!e&&!!t&&n.isIconURI(t)===n.isIconURI(e);this.setProperty("icon",t,i);if(i&&this._image){this._image.setSrc(t)}}return this};l.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("inner")};l.prototype._getText=function(){return this.getText()};l.prototype._getTooltip=function(){var t=this.getTooltip_AsString();if(!t&&!this.getText()){var e=n.getIconInfo(this.getIcon());if(e&&e.text){t=e.text}}return t};l.prototype.getAccessibilityInfo=function(){var t=this.getText()||this.getTooltip_AsString();if(!t&&this.getIcon()){var e=n.getIconInfo(this.getIcon());if(e){t=e.text||e.name}}return{role:"button",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON"),description:t,focusable:this.getEnabled(),enabled:this.getEnabled()}};return l});