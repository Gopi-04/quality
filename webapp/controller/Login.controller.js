sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("quality.portal.controller.Login", {

        onInit: function () {
            // Check if already logged in? (Optional)
        },

        onLoginPress: function () {
            var sUsername = this.getView().byId("userIdInput").getValue().toUpperCase();
            var sPassword = this.getView().byId("passwordInput").getValue();

            console.log("Attempting Login with:", sUsername, sPassword);

            // Validate inputs
            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter both User ID and Password.");
                return;
            }

            // Show busy indicator
            sap.ui.core.BusyIndicator.show();

            // Validate against OData Service (Real Backend)
            var oModel = this.getOwnerComponent().getModel();

            // Construct Path using Key Access Pattern from reference code: /ZQUALITY_2003(username='USER')
            var sPath = "/ZQUALITY_2003(username='" + sUsername + "')";
            console.log("Reading OData path:", sPath);

            oModel.read(sPath, {
                success: function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    console.log("Login response:", oData);

                    // Check if password matches and status is Success
                    if (oData.password === sPassword && oData.login_status === "Success") {
                        MessageToast.show("Welcome " + oData.username);

                        // Navigate to Dashboard
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("Dashboard");
                    } else {
                        console.warn("Credentials mismatch or login_status not Success.");
                        MessageToast.show("Login Failed: Invalid Password or Status.");
                    }
                }.bind(this),
                error: function (oError) {
                    console.error("Login read error", oError);
                    sap.ui.core.BusyIndicator.hide();

                    // Specific handling for 404 (User not found)
                    try {
                        if (oError.statusCode === "404" || oError.statusCode === 404) {
                            MessageToast.show("User not found.");
                        } else {
                            MessageToast.show("Service Error: " + (oError.message || oError.statusText));
                        }
                    } catch (e) {
                        MessageToast.show("Login Failed. Please check console.");
                    }
                }
            });
        }
    });
});
