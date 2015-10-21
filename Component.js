jQuery.sap.declare("sap.ui.demo.myFiori.Component");

jQuery.sap.require("jquery.sap.resources");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this }
		});
		
		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		oView.setModel(oModel);
		
		var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
		
			// set i18n model
		var i18nModel= new sap.ui.model.resource.ResourceModel({
            bundleUrl : "i18n/messageBundle.properties"
        });
        
		oView.setModel(i18nModel, "i18n");
		
		
	

		// done
		return oView;
	}
});