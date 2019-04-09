/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_Parser","sap/ui/core/format/DateFormat","sap/ui/model/odata/ODataUtils","sap/ui/thirdparty/jquery"],function(e,t,r,a,n){"use strict";var i=/^\/Date\((-?\d+)\)\/$/,o=r.getDateInstance({pattern:"yyyy-MM-dd",UTC:true}),s=/^\/Date\((-?\d+)(?:([-+])(\d\d)(\d\d))?\)\/$/,c={},u=r.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSZ"}),f=/\+/g,p=/^([^(]+)(\(.+\))$/,d=/\//g,l=/^PT(?:(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(\.\d+)?S)?)$/i,m=r.getTimeInstance({pattern:"HH:mm:ss",UTC:true});function y(){}y.prototype.mFinalHeaders={"Content-Type":"application/json;charset=UTF-8"};y.prototype.mPredefinedPartHeaders={Accept:"application/json"};y.prototype.mPredefinedRequestHeaders={Accept:"application/json",MaxDataServiceVersion:"2.0",DataServiceVersion:"2.0","X-CSRF-Token":"Fetch"};y.prototype.convertBinary=function(e){return e.replace(f,"-").replace(d,"_")};y.prototype.convertDate=function(e){var t,r=i.exec(e);if(!r){throw new Error("Not a valid Edm.DateTime value '"+e+"'")}t=new Date(parseInt(r[1]));if(Number(r[1]%(24*60*60*1e3))!==0){throw new Error("Cannot convert Edm.DateTime value '"+e+"' to Edm.Date because it contains a time of day")}return o.format(t)};y.prototype.convertDateTimeOffset=function(e,t){var a=s.exec(e),n,i,o,u,f="yyyy-MM-dd'T'HH:mm:ss",p=t.$Precision,d;if(!a){throw new Error("Not a valid Edm.DateTimeOffset value '"+e+"'")}d=parseInt(a[1]);i=parseInt(a[3]);o=parseInt(a[4]);if(!a[2]||i===0&&o===0){n="Z"}else{u=a[2]==="-"?-1:1;d+=u*(i*60*60*1e3+o*60*1e3);n=a[2]+a[3]+":"+a[4]}if(p>0){f+="."+"".padEnd(p,"S")}if(!c[f]){c[f]=r.getDateTimeInstance({pattern:f,UTC:true})}return c[f].format(new Date(d))+n};y.prototype.convertDoubleSingle=function(e){switch(e){case"NaN":case"INF":case"-INF":return e;default:return parseFloat(e)}};y.prototype.convertFilter=function(r,a){var n=t.parseFilter(r),i=this;function o(t,r){var a,n=c(r);if(n.$Type!=="Edm.String"){a=e.parseLiteral(t.value,n.$Type,n.path);t.value=i.formatPropertyAsLiteral(a,n)}}function s(e,t){throw new Error("Cannot convert filter to V2, "+t+" at "+e.at+": "+r)}function c(e){var t;if(e.type){return{$Type:e.type}}if(e.id==="PATH"){t=i.oModelInterface.fetchMetadata(a+"/"+e.value).getResult();if(!t){throw new Error("Invalid filter path: "+e.value)}return{path:e.value,$Type:t.$Type,$v2Type:t.$v2Type}}return c(e.parameters[0])}function u(e){if(e){if(e.id==="VALUE"&&e.ambiguous){s(e,"ambiguous type for the literal")}u(e.left);u(e.right);if(e.parameters){if(e.value==="contains"){e.value="substringof";e.parameters.push(e.parameters.shift())}e.parameters.forEach(u)}if(e.left&&e.right){if(e.left.id==="VALUE"){if(e.right.id==="VALUE"){s(e,"saw literals on both sides of '"+e.id+"'")}o(e.left,e.right)}else if(e.right.id==="VALUE"){o(e.right,e.left)}}}}u(n);return t.buildFilterString(n)};y.prototype.convertKeyPredicate=function(r,a){var n=this.fetchTypeForPath(e.getMetaPath(a)).getResult(),i=t.parseKeyPredicate(decodeURIComponent(r)),o=this;function s(t,r){var i=n[t];if(i.$Type!=="Edm.String"){r=o.formatPropertyAsLiteral(e.parseLiteral(r,i.$Type,a),i)}return encodeURIComponent(r)}if(""in i){return"("+s(n.$Key[0],i[""])+")"}return"("+n.$Key.map(function(e){return encodeURIComponent(e)+"="+s(e,i[e])}).join(",")+")"};y.prototype.convertResourcePath=function(e){var t=e.indexOf("?"),r="",a,n=-1,i=this;if(t>0){r=e.slice(t);e=e.slice(0,t)}a=e.split("/");return a.map(function(t,r){var a=p.exec(t);n+=t.length+1;if(a){t=a[1]+i.convertKeyPredicate(a[2],"/"+e.slice(0,n))}return t}).join("/")+r};y.prototype.convertTimeOfDay=function(e){var t,r=l.exec(e),a;if(!r){throw new Error("Not a valid Edm.Time value '"+e+"'")}a=Date.UTC(1970,0,1,r[1]||0,r[2]||0,r[3]||0);t=new Date(a);return m.format(t)+(r[4]||"")};y.prototype.convertNonPrimitive=function(e){var t,r,a,n,i=this;if(Array.isArray(e.results)){e.results.forEach(function(e){i.convertNonPrimitive(e)});return e.results}if(!e.__metadata||!e.__metadata.type){throw new Error("Cannot convert structured value without type information in "+"__metadata.type: "+JSON.stringify(e))}a=e.__metadata.type;r=i.getTypeForName(a);delete e.__metadata;for(t in e){n=e[t];if(n===null){continue}if(typeof n==="object"){if(n.__deferred){delete e[t]}else{e[t]=this.convertNonPrimitive(n)}continue}e[t]=this.convertPrimitive(n,r[t],a,t)}return e};y.prototype.convertPrimitive=function(e,t,r,a){switch(t&&t.$Type){case"Edm.Binary":return this.convertBinary(e);case"Edm.Date":return this.convertDate(e);case"Edm.DateTimeOffset":return this.convertDateTimeOffset(e,t);case"Edm.Boolean":case"Edm.Byte":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.SByte":case"Edm.String":return e;case"Edm.Double":case"Edm.Single":return this.convertDoubleSingle(e);case"Edm.TimeOfDay":return this.convertTimeOfDay(e);default:throw new Error("Type '"+(t&&t.$Type)+"' of property '"+a+"' in type '"+r+"' is unknown; cannot convert value: "+e)}};y.prototype.doCheckVersionHeader=function(e,t,r){var a=e("DataServiceVersion"),n=!a&&e("OData-Version");if(n){throw new Error("Expected 'DataServiceVersion' header with value '1.0' or '2.0' but "+"received 'OData-Version' header with value '"+n+"' in response for "+this.sServiceUrl+t)}if(!a){return}a=a.split(";")[0];if(a==="1.0"||a==="2.0"){return}throw new Error("Expected 'DataServiceVersion' header with value '1.0' or '2.0' but "+"received value '"+a+"' in response for "+this.sServiceUrl+t)};y.prototype.doConvertResponse=function(e,t){var r,a,n,i,o,s=this;e=e.d;a=Array.isArray(e.results);if(!a&&!e.__metadata){n=Object.keys(e);r=e[n[0]];if(n.length===1){if(r===null){return{value:null}}else if(typeof r!=="object"){return{value:this.convertPrimitive(r,this.oModelInterface.fetchMetadata(t).getResult(),t,n[0])}}else if(r.__metadata){e=r}}}if(a&&!e.results.length){i=[]}else if(a&&!e.results[0].__metadata){o=this.oModelInterface.fetchMetadata(t).getResult();i=e.results.map(function(e){return s.convertPrimitive(e,o,t,"")})}else{i=this.convertNonPrimitive(e)}if(a){i={value:i};if(e.__count){i["@odata.count"]=e.__count}if(e.__next){i["@odata.nextLink"]=e.__next}}return i};y.prototype.doConvertSystemQueryOptions=function(t,r,a,n,i){var o,s={},c=this;function u(t,r){if(!Array.isArray(t)){t=t.split(",")}t.forEach(function(t){var a=t.indexOf("/");if(a>=0&&t.indexOf(".")<0){t=t.slice(0,a)}s[e.buildPath(r,t)]=true})}function f(t,r,a){if(!r||typeof r!=="object"){throw new Error("$expand must be a valid object")}Object.keys(r).forEach(function(n){var i=e.buildPath(a,n),o=r[n];t.push(i);if(typeof o==="object"){Object.keys(o).forEach(function(e){switch(e){case"$expand":f(t,o.$expand,i);break;case"$select":u(o.$select,i);break;default:throw new Error("Unsupported query option in $expand: "+e)}})}if(!o.$select){s[i+"/*"]=true}});return t}Object.keys(r).forEach(function(e){var o=e[0]==="$",s=r[e];if(n&&o){return}switch(e){case"$count":e="$inlinecount";s=s?"allpages":"none";break;case"$expand":s=f([],s,"");s=(i?s.sort():s).join(",");break;case"$orderby":break;case"$select":u(s);return;case"$filter":s=c.convertFilter(s,t);break;default:if(o){throw new Error("Unsupported system query option: "+e)}}a(e,s)});o=Object.keys(s);if(o.length>0){if(!r.$select){o.push("*")}a("$select",(i?o.sort():o).join(","))}};y.prototype.formatPropertyAsLiteral=function(e,t){function r(e,r){var a=e.parse(r);if(!a){throw new Error("Not a valid "+t.$Type+" value: "+r)}return a}if(e===null){return"null"}switch(t.$Type){case"Edm.Boolean":case"Edm.Byte":case"Edm.Decimal":case"Edm.Double":case"Edm.Guid":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.SByte":case"Edm.Single":case"Edm.String":break;case"Edm.Date":e=r(o,e);break;case"Edm.DateTimeOffset":e=r(u,e);break;case"Edm.TimeOfDay":e={__edmType:"Edm.Time",ms:r(m,e).getTime()};break;default:throw new Error("Type '"+t.$Type+"' in the key predicate is not supported")}return a.formatValue(e,t.$v2Type||t.$Type)};y.prototype.getPathAndAddQueryOptions=function(e,t,r,a,n){var i,o,s=this;e=e.slice(1,-5);if(t.$IsBound){e=e.slice(e.lastIndexOf(".")+1);if(typeof n==="function"){n=n()}o=this.getTypeForName(t.$Parameter[0].$Type);o.$Key.forEach(function(e){a[e]=s.formatPropertyAsLiteral(n[e],o[e])})}if(t.$Parameter){t.$Parameter.forEach(function(e){i=e.$Name;if(i in r){if(e.$isCollection){throw new Error("Unsupported collection-valued parameter: "+i)}a[i]=s.formatPropertyAsLiteral(r[i],e);delete r[i]}})}for(i in r){delete r[i]}if(t.$v2HttpMethod){r["X-HTTP-Method"]=t.$v2HttpMethod}return e};y.prototype.getTypeForName=function(e){var t;this.mTypesByName=this.mTypesByName||{};t=this.mTypesByName[e];if(!t){t=this.mTypesByName[e]=this.oModelInterface.fetchMetadata("/"+e).getResult()}return t};y.prototype.isActionBodyOptional=function(){return true};y.prototype.isChangeSetOptional=function(){return false};y.prototype.ready=function(){return this.oModelInterface.fetchEntityContainer().then(function(){})};return function(e){n.extend(e,y.prototype);e.oModelInterface.reportBoundMessages=function(){};e.oModelInterface.reportUnboundMessages=function(){}}},false);