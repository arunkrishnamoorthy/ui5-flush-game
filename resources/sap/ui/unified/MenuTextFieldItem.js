/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","./MenuItemBase","./library","sap/ui/core/library","sap/ui/Device","sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/dom/jquery/cursorPos"],function(t,e,i,s,a,r,n){"use strict";var o=s.ValueState;var u=e.extend("sap.ui.unified.MenuTextFieldItem",{metadata:{library:"sap.ui.unified",properties:{label:{type:"string",group:"Appearance",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},value:{type:"string",group:"Misc",defaultValue:null},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:o.None}}}});(function(){u.prototype.render=function(t,e,i,s){var a=t,r=i.checkEnabled(e),n=e.getId();var o="sapUiMnuItm sapUiMnuTfItm";if(s.iItemNo==1){o+=" sapUiMnuItmFirst"}else if(s.iItemNo==s.iTotalItems){o+=" sapUiMnuItmLast"}if(!i.checkEnabled(e)){o+=" sapUiMnuItmDsbl"}if(e.getStartsSection()){o+=" sapUiMnuItmSepBefore"}a.write("<li ");a.writeAttribute("class",o);a.writeElementData(e);if(s.bAccessible){a.writeAttribute("role","menuitem");a.writeAttribute("aria-disabled",!r)}a.write('><div class="sapUiMnuItmL"></div>');a.write('<div class="sapUiMnuItmIco">');if(e.getIcon()){a.writeIcon(e.getIcon(),null,{title:null})}a.write("</div>");a.write('<div id="'+n+'-txt" class="sapUiMnuItmTxt">');a.write('<label id="'+n+'-lbl" class="sapUiMnuTfItemLbl">');a.writeEscaped(e.getLabel()||"");a.write("</label>");a.write('<div id="'+n+'-str" class="sapUiMnuTfItmStretch"></div>');a.write('<div class="sapUiMnuTfItemWrppr">');a.write('<input id="'+n+'-tf" tabindex="-1"');a.writeAttributeEscaped("value",e.getValue()||"");a.writeAttribute("class",r?"sapUiMnuTfItemTf sapUiMnuTfItemTfEnbl":"sapUiMnuTfItemTf sapUiMnuTfItemTfDsbl");if(!r){a.writeAttribute("disabled","disabled")}if(s.bAccessible){a.writeAccessibilityState(e,{role:"textbox",disabled:!r,multiline:false,autocomplete:"none",posinset:s.iItemNo,setsize:s.iTotalItems,labelledby:{value:n+"-lbl",append:true}})}a.write("/></div></div>");a.write('<div class="sapUiMnuItmR"></div>');a.write("</li>")};u.prototype.hover=function(t,e){this.$().toggleClass("sapUiMnuItmHov",t);if(t&&e.checkEnabled(this)){e.closeSubmenu(false,true);if(a.browser.msie){setTimeout(function(){var t=function(){this.$("tf").focus()}.bind(this);if(typeof t==="string"||t instanceof String){t=this[t]}t.apply(this,[])}.bind(this),0)}else{this.$("tf").focus()}}};u.prototype.onAfterRendering=function(){this._adaptSizes();this.setValueState(this.getValueState())};u.prototype.onsapup=function(t){this.getParent().focus();this.getParent().onsapprevious(t)};u.prototype.onsapdown=function(t){this.getParent().focus();this.getParent().onsapnext(t)};u.prototype.onsaphome=function(t){if(this._checkCursorPosForNav(false)){this.getParent().focus();this.getParent().onsaphome(t)}};u.prototype.onsapend=function(t){if(this._checkCursorPosForNav(true)){this.getParent().focus();this.getParent().onsapend(t)}};u.prototype.onsappageup=function(t){this.getParent().focus();this.getParent().onsappageup(t)};u.prototype.onsappagedown=function(t){this.getParent().focus();this.getParent().onsappagedown(t)};u.prototype.onsapescape=function(t){this.getParent().onsapescape(t)};u.prototype.onkeydown=function(t){t.stopPropagation()};u.prototype.onclick=function(t){this.getParent().closeSubmenu(false,true);if(!a.system.desktop&&this.getParent().checkEnabled(this)){this.focus()}t.stopPropagation()};u.prototype.onkeyup=function(t){if(!n.events.sapenter.fnCheck(t)){return}var e=this.$("tf").val();this.setValue(e);this.getParent().selectItem(this);t.preventDefault();t.stopPropagation()};u.prototype.setSubmenu=function(t){r.warning("The aggregation 'submenu' is not supported for this type of menu item.","","sap.ui.unified.MenuTextFieldItem");return this};u.prototype.setLabel=function(t){this.setProperty("label",t,true);this.$("lbl").text(t);this._adaptSizes();return this};u.prototype.setValue=function(t){this.setProperty("value",t,true);this.$("tf").val(t);return this};u.prototype.setValueState=function(e){this.setProperty("valueState",e,true);var i=this.$("tf");i.toggleClass("sapUiMnuTfItemTfErr",e==o.Error);i.toggleClass("sapUiMnuTfItemTfWarn",e==o.Warning);var s=t.enrichTooltip(this,this.getTooltip_AsString());this.$().attr("title",s?s:"");return this};u.prototype.getFocusDomRef=function(){var t=this.$("tf");return t.length?t.get(0):null};u.prototype._adaptSizes=function(){var t=this.$("tf");var e=this.$("lbl");var i=e.length?e.get(0).offsetLeft:0;if(sap.ui.getCore().getConfiguration().getRTL()){t.parent().css({width:"auto",right:this.$().outerWidth(true)-i+(e.outerWidth(true)-e.outerWidth())+"px"})}else{t.parent().css({width:"auto",left:i+e.outerWidth(true)+"px"})}};u.prototype._checkCursorPosForNav=function(t){var e=sap.ui.getCore().getConfiguration().getRTL();var i=t?e:!e;var s=this.$("tf");var a=s.cursorPos();var r=s.val().length;if(e){a=r-a}if(!i&&a!=r||i&&a!=0){return false}return true}})();return u});