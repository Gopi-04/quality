sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("quality.portal.controller.Dashboard", {

        onInit: function () {

        },

        onLogout: function () {
            var oRouter = UIComponent.getRouterFor(this);
            // Ideally clear session here
            oRouter.navTo("Login");
        },

        onNavToInspectionLots: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("InspectionLots");
        },

        onNavToResultRecording: function () {
            sap.m.MessageToast.show("Navigating to Result Recording...");
        },

        onNavToUsageDecision: function () {
            sap.m.MessageToast.show("Navigating to Usage Decision...");
        }

    });
});
