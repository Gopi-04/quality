sap.ui.define([], function () {
    "use strict";

    return {

        statusState: function (sStatus) {
            switch (sStatus) {
                case "COMPLETED":
                    return "Success";
                case "IN_PROGRESS":
                    return "Warning";
                case "NEW":
                    return "Information";
                default:
                    return "None";
            }
        },

        statusIcon: function (sStatus) {
            switch (sStatus) {
                case "COMPLETED":
                    return "sap-icon://accept";
                case "IN_PROGRESS":
                    return "sap-icon://pending";
                case "NEW":
                    return "sap-icon://create";
                default:
                    return "";
            }
        },

        decisionState: function (sDecision) {
            if (sDecision === "APPROVED") return "Success";
            if (sDecision === "REJECTED") return "Error";
            return "None";
        },

        decisionIcon: function (sDecision) {
            if (sDecision === "APPROVED") return "sap-icon://thumb-up";
            if (sDecision === "REJECTED") return "sap-icon://thumb-down";
            return "";
        }

    };
});
