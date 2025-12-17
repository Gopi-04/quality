sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "quality/portal/model/formatter"
], function (Controller, UIComponent, History, formatter) {
    "use strict";

    return Controller.extend("quality.portal.controller.InspectionLots", {

        formatter: formatter,

        onInit: function () {

        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Dashboard", {}, true);
            }
        },

        onPressLot: function (oEvent) {
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext();
            var sPath = oBindingContext.getPath();
            var sInspectionLot = oBindingContext.getProperty("InspectionLot");

            // Navigate to Result Recording or Details (To be implemented)
            sap.m.MessageToast.show("Selected Lot: " + sInspectionLot);

            // FUTURE: this.getRouter().navTo("ResultRecording", { lotId: sInspectionLot });
        }

    });
});
