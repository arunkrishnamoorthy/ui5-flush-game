/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/Global","sap/ui/core/Core","sap/ui/core/ElementMetadata","sap/base/util/LoaderExtensions","sap/base/util/UriParameters"],function(e,t,r,a,n,i){"use strict";var o=sap.ui.getCore().getConfiguration();function g(){var e;var t;try{e=sap.ui.getVersionInfo()}catch(t){e=undefined}if(e){t=e.gav?e.gav:e.name;return t.indexOf("openui5")!==-1?"OpenUI5":"SAPUI5"}else{return""}}function u(){var e=t.versioninfo?t.versioninfo.libraries:undefined;var r=Object.create(null);if(e!==undefined){e.forEach(function(e,t,a){r[e.name]=e.version})}return r}function s(){var e=sap.ui.getCore().getLoadedLibraries();var t=Object.create(null);Object.keys(sap.ui.getCore().getLoadedLibraries()).forEach(function(r,a,n){t[r]=e[r].version});return t}function d(){return{commonInformation:{frameworkName:g(),version:t.version,buildTime:t.buildinfo.buildtime,lastChange:t.buildinfo.lastchange,jquery:jQuery.fn.jquery,userAgent:navigator.userAgent,applicationHREF:window.location.href,documentTitle:document.title,documentMode:document.documentMode||"",debugMode:jQuery.sap.debug(),statistics:jQuery.sap.statistics()},configurationBootstrap:window["sap-ui-config"]||Object.create(null),configurationComputed:{theme:o.getTheme(),language:o.getLanguage(),formatLocale:o.getFormatLocale(),accessibility:o.getAccessibility(),animation:o.getAnimation(),rtl:o.getRTL(),debug:o.getDebug(),inspect:o.getInspect(),originInfo:o.getOriginInfo(),noDuplicateIds:o.getNoDuplicateIds()},libraries:u(),loadedLibraries:s(),loadedModules:n.getAllRequiredModules().sort(),URLParameters:new i(window.location.href).mParams}}var c={_createRenderedTreeModel:function(e,t){var r=e;var a=r.firstElementChild;var n=t;var i=n;var o=sap.ui.getCore().byId(r.id);if(r.getAttribute("data-sap-ui")&&o){n.push({id:o.getId(),name:o.getMetadata().getName(),type:"sap-ui-control",content:[]});i=n[n.length-1].content}else if(r.getAttribute("data-sap-ui-area")){n.push({id:r.id,name:"sap-ui-area",type:"data-sap-ui",content:[]});i=n[n.length-1].content}while(a){this._createRenderedTreeModel(a,i);a=a.nextElementSibling}}};var l={_getOwnProperties:function(e){var t=Object.create(null);var r=e.getMetadata().getProperties();t.meta=Object.create(null);t.meta.controlName=e.getMetadata().getName();t.properties=Object.create(null);Object.keys(r).forEach(function(a){t.properties[a]=Object.create(null);t.properties[a].value=e.getProperty(a);t.properties[a].type=r[a].getType().getName?r[a].getType().getName():""});return t},_copyInheritedProperties:function(e,t){var r=t.getProperties();var a=Object.create(null);a.meta=Object.create(null);a.meta.controlName=t.getName();a.properties=Object.create(null);Object.keys(r).forEach(function(t){a.properties[t]=Object.create(null);a.properties[t].value=r[t].get(e);a.properties[t].type=r[t].getType().getName?r[t].getType().getName():""});return a},_getInheritedProperties:function(e){var t=[];var r=e.getMetadata().getParent();while(r instanceof a){t.push(this._copyInheritedProperties(e,r));r=r.getParent()}return t},_getProperties:function(e){var t=sap.ui.getCore().byId(e);var r=Object.create(null);if(t){r.own=this._getOwnProperties(t);r.inherited=this._getInheritedProperties(t)}return r},_getModelFromContext:function(e,t){var r=e.getBinding(t);var a=r.getModel();var n=e.getBindingInfo(t).parts?e.getBindingInfo(t).parts:[];var i=[];for(var o=0;o<n.length;o++){i.push(n[o].model)}var g={names:i,path:r.getPath()};if(a){g.mode=a.getDefaultBindingMode();g.type=a.getMetadata().getName();g.data=a.getData?a.getData("/"):undefined}return g},_getBindDataForProperties:function(e){var t=e.getMetadata().getAllProperties();var r=Object.create(null);for(var a in t){if(t.hasOwnProperty(a)&&e.getBinding(a)){r[a]=Object.create(null);r[a].path=e.getBinding(a).getPath();r[a].value=e.getBinding(a).getValue();r[a].type=e.getMetadata().getProperty(a).getType().getName?e.getMetadata().getProperty(a).getType().getName():"";r[a].mode=e.getBinding(a).getBindingMode();r[a].model=this._getModelFromContext(e,a)}}return r},_getBindDataForAggregations:function(e){var t=e.getMetadata().getAllAggregations();var r=Object.create(null);for(var a in t){if(t.hasOwnProperty(a)&&e.getBinding(a)){r[a]=Object.create(null);r[a].model=this._getModelFromContext(e,a)}}return r}};return{getFrameworkInformation:d,getRenderedControlTree:function(){var e=[];c._createRenderedTreeModel(document.body,e);return e},getControlProperties:function(e){return l._getProperties(e)},getControlBindings:function(e){var t=Object.create(null);var r=sap.ui.getCore().byId(e);var a;if(!r){return t}a=r.getBindingContext();t.meta=Object.create(null);t.contextPath=a?a.getPath():null;t.aggregations=l._getBindDataForAggregations(r);t.properties=l._getBindDataForProperties(r);return t}}});