sap.ui.controller("sap.ui.demo.myFiori.view.LineItem", {

	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},
	
	handleRefresh : function (evt) {
		var that = this;
		setTimeout(function () {
			that.getView().byId("pullToRefresh").hide();
		}, 1000);
	}
});