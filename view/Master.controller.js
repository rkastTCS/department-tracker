sap.ui.controller("sap.ui.demo.myFiori.view.Master", {


	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
	
	handleLanguageChange : function (evt) {
		var item = evt.getParameter("selectedItem").mProperties;
		var app =  sap.ui.getCore().byId("app");
		var i18nModel= new sap.ui.model.resource.ResourceModel({
            bundleUrl : "i18n/messageBundle"+item.key+".properties",
            bundleLocale: ""
        });
        
        app.setModel(i18nModel, "i18n");
	},
	
	//set model to json file
	onInit : function (evt) {
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
			this.getView().setModel(oModel);
			
		},

	//search and filter function
	onSearch : function (oEvt) {
			
			// build filters
			var query1 = oEvt.getParameter("newValue");
			var query2 = oEvt.getParameter("newValue");
			var oFilter1 = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, query1);
			var oFilter2 = new sap.ui.model.Filter("DId", sap.ui.model.FilterOperator.Contains, query2);
			var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2], false); 
			var filters = [allFilter];
			
			
			// get list and filter bound items
			var list = this.getView().byId("idList");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},
		
	//refresh function that doesn't actually refresh
	handleRefresh : function (evt) {
		var that = this;
		setTimeout(function () {
			that.getView().byId("pullToRefresh").hide();
		}, 1000);
	},
	
	onInit: function() {
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
		},

		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oText = this.getView().byId("selectedDate");
			var aSelectedDates = oCalendar.getSelectedDates();
			var oDate;
			if (aSelectedDates.length > 0 ) {
				oDate = aSelectedDates[0].getStartDate();
				oText.setText(this.oFormatYyyymmdd.format(oDate));
			} else {
				oText.setValue("No Date Selected");
			}
		},

		handleSelectToday: function(oEvent) {
			var oCalendar = this.getView().byId("calendar");
			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({startDate: new Date()}));
			this._updateText(oCalendar);
		}
	});

