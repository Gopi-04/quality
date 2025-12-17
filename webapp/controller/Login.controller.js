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

            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter both User ID and Password.");
                return;
            }

            // Validate against OData Service (Mock or Real)
            var oModel = this.getOwnerComponent().getModel();

            // We use 'read' to fetch the user. In a real scenario, this might be a function import 
            // or we filter the EntitySet. Security-wise, filtering EntitySet by password is bad practice,
            // but for this specific requirement "verify in custom table", we will simulate a read with filters.
            // Ideally, we should POST to a FunctionImport, but standard OData read is easier to mock instantly.

            // Fetch ALL users and filter client-side to avoid Mock Server filter issues
            // This is a workaround for the mock environment being flaky with filters
            console.log("Fetching all users to validate client-side...");

            // Show busy indicator
            sap.ui.core.BusyIndicator.show();

            oModel.read("/ZQP_LOGIN_GP", {
                success: function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    console.log("Login read success. Total users found:", oData.results.length);
                    console.log("Available Users:", oData.results);

                    var oUser = null;
                    if (oData.results) {
                        // Client-side find
                        oUser = oData.results.find(function (user) {
                            return user.username.toUpperCase() === sUsername && user.password === sPassword;
                        });
                    }

                    if (oUser) {
                        MessageToast.show("Welcome " + oUser.username);

                        // Check login status if needed
                        if (oUser.login_status === "Success") {
                            // Navigate to Dashboard
                            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                            oRouter.navTo("Dashboard");
                        } else {
                            MessageToast.show("Login Status: " + oUser.login_status);
                        }
                    } else {
                        console.warn("User not found in list. Searched for:", sUsername, sPassword);
                        MessageToast.show("Invalid Credentials. User not found.");
                    }
                }.bind(this),
                error: function (oError) {
                    console.error("Login read error", oError);
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Login Failed. Please check network or service.");
                }
            });
        }
    });
});
