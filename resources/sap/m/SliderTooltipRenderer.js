/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(t){"use strict";var e={};e.CSS_CLASS="sapMSliderTooltip";e.render=function(t,i){t.write("<div");t.writeControlData(i);t.addClass(e.CSS_CLASS);t.writeClasses();if(i.getWidth()){t.addStyle("width",i.getWidth())}t.writeStyles();t.write(">");this.renderTooltipElement(t,i);t.write("</div>")};e.renderTooltipElement=function(t,i){var r=sap.ui.getCore().getConfiguration().getAccessibility();t.write("<input ");t.addClass(e.CSS_CLASS+"Input");if(!i.getEditable()){t.addClass(e.CSS_CLASS+"NonEditable")}if(r){t.writeAccessibilityState(i,{})}t.writeClasses();t.writeAttribute("tabindex","-1");t.writeAttributeEscaped("value",i.getValue());t.writeAttributeEscaped("type","number");t.writeAttributeEscaped("step",i.getStep());t.writeAttributeEscaped("id",i.getId()+"-input");t.write("/>")};return e},true);