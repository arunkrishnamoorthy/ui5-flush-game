sap.ui.define(["sap/base/Log","sap/ui/core/Control"],function(e,t){"use strict";return t.extend("flush.controls.ControlManager",{metadata:{defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true}}},updateAllControlImages:function(){var e=[];this.getContent().forEach(function(t){e.push(this.updateControlImage(t))}.bind(this));return Promise.all(e)},updateControlImage:function(t){if(!t||!t.getDomRef()){e.info("There are controls with no DOMRef!");return Promise.resolve()}else{if(t.setBlocked){t.setBlocked(false)}return domtoimage.toPngCacheId(t.getDomRef()).then(function(e){t._dataUrl=e;var o=new Image;o.src=e;t._image=o;if(t.setBlocked){t.setBlocked(true)}}).then(function(){return domtoimage.toPngCacheId(t.getDomRef(),undefined,"Blocked").then(function(e){t._dataUrlBlocked=e;var o=new Image;o.src=e;t._imageBlocked=o})}).catch(function(t){e.error("oops, something went wrong!",t)})}},renderer:function(e,t){e.write("<div");e.writeControlData(t);e.writeClasses();e.write(">");var o=t.getContent();var n=o.length;for(var r=0;r<n;r++){e.renderControl(o[r])}e.write("</div>")}})});