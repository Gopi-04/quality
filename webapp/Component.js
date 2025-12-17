sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"quality/portal/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("quality.portal.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// Global Error Handler for Metadata
			var oModel = this.getModel();
			if (oModel) {
				oModel.attachMetadataFailed(function (oEvent) {
					var oParams = oEvent.getParameters();
					var sMessage = "Backend Service Connection Failed.";
					if (oParams.response) {
						sMessage += " Status: " + oParams.response.statusCode;
						sMessage += " (" + oParams.response.statusText + ")";
					}
					sap.m.MessageToast.show(sMessage + " Check Service URL/VPN.");
					console.error("Metadata Failed:", oParams);
				});
			}

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});