/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/CalendarLegendRenderer","sap/ui/unified/library","sap/base/Log"],function(e,t,a,r,i){"use strict";var d=r.CalendarDayType;var n={};n.render=function(e,t){var a=t._getStartDate();var r=t.getTooltip_AsString();var i=t.getId();var d={value:i+"-Descr",append:true};e.write("<div");e.writeControlData(t);e.addClass("sapUiCalMonthsRow");e.addClass("sapUiCalRow");e.writeClasses();if(r){e.writeAttributeEscaped("title",r)}if(t._getShowHeader()){d.value=d.value+" "+i+"-Head"}e.writeAccessibilityState(t,{role:"grid",readonly:"true",multiselectable:!t.getSingleSelection()||t.getIntervalSelection(),labelledby:d});e.write(">");e.write('<span id="'+i+'-Descr" style="display: none;">'+t._rb.getText("CALENDAR_DIALOG")+"</span>");if(t.getIntervalSelection()){e.write('<span id="'+i+'-Start" style="display: none;">'+t._rb.getText("CALENDAR_START_MONTH")+"</span>");e.write('<span id="'+i+'-End" style="display: none;">'+t._rb.getText("CALENDAR_END_MONTH")+"</span>")}this.renderRow(e,t,a);e.write("</div>")};n.renderRow=function(e,t,a){var r=t.getId();this.renderHeader(e,t,a);e.write('<div id="'+r+'-months" class="sapUiCalItems">');this.renderMonths(e,t,a);e.write("</div>")};n.renderHeader=function(t,a,r){e._checkCalendarDate(r);if(a._getShowHeader()){var i=a._getLocaleData();var d=a.getId();t.write('<div id="'+d+'-Head">');this.renderHeaderLine(t,a,i,r);t.write("</div>")}};n.renderHeaderLine=function(a,r,i,d){e._checkCalendarDate(d);var n=r.getId();var s=r.getMonths();var l=new t(d);var o="";var c=0;var g=[];var h=0;for(h=0;h<s;h++){c=l.getYear();if(g.length>0&&g[g.length-1].iYear==c){g[g.length-1].iMonths++}else{g.push({iYear:c,iMonths:1})}l.setMonth(l.getMonth()+1)}for(h=0;h<g.length;h++){var C=g[h];o=100/s*C.iMonths+"%";a.write('<div id="'+n+"-Head"+h+'"class="sapUiCalHeadText" style="width:'+o+'">');a.write(C.iYear);a.write("</div>")}};n.renderMonths=function(e,a,r){var i=this.getHelper(a,r);var d=a.getMonths();var n=100/d+"%";var s=new t(r);s.setDate(1);for(var l=0;l<d;l++){this.renderMonth(e,a,s,i,n);s.setMonth(s.getMonth()+1)}};n.getHelper=function(a,r){e._checkCalendarDate(r);var d={};d.sLocale=a._getLocale();d.oLocaleData=a._getLocaleData();d.oToday=new t;d.sCurrentMonth=a._rb.getText("CALENDAR_CURRENT_MONTH");d.sId=a.getId();d.oFormatLong=a._getFormatLong();if(a._bLongMonth||!a._bNamesLengthChecked){d.aMonthNames=d.oLocaleData.getMonthsStandAlone("wide")}else{d.aMonthNames=d.oLocaleData.getMonthsStandAlone("abbreviated");d.aMonthNamesWide=d.oLocaleData.getMonthsStandAlone("wide")}var n=a.getLegend();if(n){var s=sap.ui.getCore().byId(n);if(s){if(!(s instanceof sap.ui.unified.CalendarLegend)){throw new Error(s+" is not an sap.ui.unified.CalendarLegend. "+a)}d.oLegend=s}else{i.warning("CalendarLegend "+n+" does not exist!",a)}}return d};n.renderMonth=function(t,r,i,n,s){e._checkCalendarDate(i);var l={role:r._getAriaRole(),selected:false,label:"",describedby:""};if(!r._bLongMonth&&r._bNamesLengthChecked){l["label"]=n.aMonthNamesWide[i.getMonth()]}var o=r._oFormatYyyymm.format(i.toUTCJSDate(),true);var c=r._checkDateSelected(i);var g=r._getDateType(i);var h=r._checkMonthEnabled(i);t.write("<div");t.writeAttribute("id",n.sId+"-"+o);t.addClass("sapUiCalItem");if(s){t.addStyle("width",s)}if(e._isSameMonthAndYear(i,n.oToday)){t.addClass("sapUiCalItemNow");l["label"]=n.sCurrentMonth+" "}if(c>0){t.addClass("sapUiCalItemSel");l["selected"]=true}if(c==2){t.addClass("sapUiCalItemSelStart");l["describedby"]=l["describedby"]+" "+n.sId+"-Start"}else if(c==3){t.addClass("sapUiCalItemSelEnd");l["describedby"]=l["describedby"]+" "+n.sId+"-End"}else if(c==4){t.addClass("sapUiCalItemSelBetween")}else if(c==5){t.addClass("sapUiCalItemSelStart");t.addClass("sapUiCalItemSelEnd");l["describedby"]=l["describedby"]+" "+n.sId+"-Start";l["describedby"]=l["describedby"]+" "+n.sId+"-End"}if(g&&g.type!=d.None){t.addClass("sapUiCalItem"+g.type);if(g.tooltip){t.writeAttributeEscaped("title",g.tooltip)}}if(!h){t.addClass("sapUiCalItemDsbl");l["disabled"]=true}t.writeAttribute("tabindex","-1");t.writeAttribute("data-sap-month",o);l["label"]=l["label"]+n.oFormatLong.format(i.toUTCJSDate(),true);if(g&&g.type!=d.None){a.addCalendarTypeAccInfo(l,g.type,n.oLegend)}t.writeAccessibilityState(null,l);t.writeClasses();t.writeStyles();t.write(">");t.write("<span");t.addClass("sapUiCalItemText");t.writeClasses();t.write(">");t.write(n.aMonthNames[i.getMonth()]);t.write("</span>");t.write("</div>")};return n},true);