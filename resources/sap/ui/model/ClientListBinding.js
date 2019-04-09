/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ChangeReason","./Filter","./FilterType","./ListBinding","./FilterProcessor","./Sorter","./SorterProcessor","sap/ui/thirdparty/jquery"],function(t,i,e,s,r,n,o,h){"use strict";var a=s.extend("sap.ui.model.ClientListBinding",{constructor:function(t,i,e,n,o,h){s.apply(this,arguments);this.oModel.checkFilterOperation(this.aApplicationFilters);this.oCombinedFilter=r.combineFilters(this.aFilters,this.aApplicationFilters);this.bIgnoreSuspend=false;this.update()},metadata:{publicMethods:["getLength"]}});a.prototype._getContexts=function(t,i){if(!t){t=0}if(!i){i=Math.min(this.iLength,this.oModel.iSizeLimit)}var e=Math.min(t+i,this.aIndices.length),s,r=[],n=this.oModel.resolve(this.sPath,this.oContext);if(n&&!n.endsWith("/")){n+="/"}for(var o=t;o<e;o++){s=this.oModel.getContext(n+this.aIndices[o]);r.push(s)}return r};a.prototype.setContext=function(i){if(this.oContext!=i){this.oContext=i;if(this.isRelative()){this.update();this._fireChange({reason:t.Context})}}};a.prototype.getLength=function(){return this.iLength};a.prototype._getLength=function(){return this.aIndices.length};a.prototype.updateIndices=function(){this.aIndices=[];for(var t=0;t<this.oList.length;t++){this.aIndices.push(t)}};a.prototype.sort=function(i){if(this.bSuspended){this.checkUpdate(true)}if(!i){this.aSorters=null;this.updateIndices();this.applyFilter()}else{if(i instanceof n){i=[i]}this.aSorters=i;this.applySort()}this.bIgnoreSuspend=true;this._fireChange({reason:t.Sort});this._fireSort({sorter:i});this.bIgnoreSuspend=false;return this};a.prototype.applySort=function(){var t=this;if(!this.aSorters||this.aSorters.length==0){return}this.aIndices=o.apply(this.aIndices,this.aSorters,function(i,e){return t.oModel.getProperty(e,t.oList[i])})};a.prototype.filter=function(s,n){this.oModel.checkFilterOperation(s);if(this.bSuspended){this.checkUpdate(true)}this.updateIndices();if(s instanceof i){s=[s]}if(n==e.Application){this.aApplicationFilters=s||[]}else if(n==e.Control){this.aFilters=s||[]}else{this.aFilters=s||[];this.aApplicationFilters=[]}this.oCombinedFilter=r.combineFilters(this.aFilters,this.aApplicationFilters);if(this.aFilters.length===0&&this.aApplicationFilters.length===0){this.iLength=this._getLength()}else{this.applyFilter()}this.applySort();this.bIgnoreSuspend=true;this._fireChange({reason:t.Filter});if(n==e.Application){this._fireFilter({filters:this.aApplicationFilters})}else{this._fireFilter({filters:this.aFilters})}this.bIgnoreSuspend=false;return this};a.prototype.applyFilter=function(){var t=this;this.aIndices=r.apply(this.aIndices,this.oCombinedFilter,function(i,e){return t.oModel.getProperty(e,t.oList[i])});this.iLength=this.aIndices.length};a.prototype.getDistinctValues=function(t){var i=[],e={},s,r=this;h.each(this.oList,function(n,o){s=r.oModel.getProperty(t,o);if(!e[s]){e[s]=true;i.push(s)}});return i};return a});