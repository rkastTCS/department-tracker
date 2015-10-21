sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleLineItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	},
	
	handleRefresh : function (evt) {
		var that = this;
		setTimeout(function () {
			that.getView().byId("pullToRefresh").hide();
		}, 1000);
	},

	
	//set model to json file
	onInit : function (evt) {
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
			this.getView().setModel(oModel);
		},
	
	
	
	onSearch1 : function (oEvt) {

			// build filters
			var query1 = oEvt.getParameter("newValue");
			var query2 = oEvt.getParameter("newValue");
			var query3 = oEvt.getParameter("newValue");
			var query4 = oEvt.getParameter("newValue");
			var oFilter1 = new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.Contains, query1);
			var oFilter2 = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.Contains, query2);
		    var oFilter3 = new sap.ui.model.Filter("GrossAmount", sap.ui.model.FilterOperator.Contains, query3);
		    var oFilter4 = new sap.ui.model.Filter("Date", sap.ui.model.FilterOperator.Contains, query4);
			var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4], false); 
			var filters = [allFilter];
			
			
			// get list and filter bound items
			var list = this.getView().byId("salesTable");
			var binding = list.getBinding("items");
			binding.filter(filters);
			
			/*
			// build filters
			var query2 = oEvt.getParameter("newValue");
			var idFilter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.Contains, query2);
			var filtersId = [idFilter];
			

			// get list and filter bound items
			var list2 = this.getView().byId("salesTable");
			var binding2 = list2.getBinding("items");
			binding2.filterId(filtersId);*/
		},

		
		onSearch2 : function (oEvt) {
			
	
			// build filters
			var query1 = oEvt.getParameter("newValue");
			var query2 = oEvt.getParameter("newValue");
			var query3 = oEvt.getParameter("newValue");
			var query4 = oEvt.getParameter("newValue");
			var oFilter1 = new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.Contains, query1);
			var oFilter2 = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.Contains, query2);
		    var oFilter3 = new sap.ui.model.Filter("GrossAmount", sap.ui.model.FilterOperator.Contains, query3);
		    var oFilter4 = new sap.ui.model.Filter("Date", sap.ui.model.FilterOperator.Contains, query4);
			var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4], false); 
			var filters = [allFilter];
			
			
			// get list and filter bound items
			var list = this.getView().byId("expensesTable");
			var binding = list.getBinding("items");
			binding.filter(filters);

		},
	
	
	
	handleAddSale : function (evt){
		//construct buttons 
		var saveButton = new sap.m.Button("saveBtn",{
			text: "{i18n>SaveBtnText}",
			tap: [this.saveNewSale, this]
		});
		
		var cancelButton = new sap.m.Button("cancelBtn",{
			text: "{i18n>CancelBtnText}",
			tap: [this.cancelNewSale, this]
		});
    	
    	//construct input fields
    	var idInput = new sap.m.Input("idInput");
    	var idLabel = new sap.m.Label("idLabel", {
    		text: "{i18n>SalesIDColumnHeader}",
    		lableFor: "idInput"
    	});
    	
    	var typeInput = new sap.m.Input("typeInput");
    	var typeLabel = new sap.m.Label("typeLabel", {
    		text: "{i18n>SalesProductColumnHeader}",
    		lableFor: "typeInput"
    	});
    	
    	var priceInput = new sap.m.Input("priceInput");
    	var priceLabel = new sap.m.Label("priceLabel", {
    		text: "{i18n>SalesPriceColumnHeader}",
    		lableFor: "priceInput"
    	});
		
		var dateInput = new sap.m.Input("dateInput");
    	var dateLabel = new sap.m.Label("dateLabel", {
    		text: "{i18n>SalesDateColumnHeader}",
    		lableFor: "dateInput"
    	});
    	
		//construct dialog
		var dialog = new sap.m.Dialog("addSaleDialog", {
				title: '{i18n>AddSaleDialogTitle}',
				buttons: [saveButton, cancelButton],
				content: [idLabel,idInput,typeLabel,typeInput,priceLabel,priceInput,dateLabel,dateInput],
				afterClose: function() {
					dialog.destroy();
				}
		});
		

		//to get access to the global model
		this.getView().addDependent(dialog);
		dialog.open();
		
	},
	
	saveNewSale : function(evt){
		var sPath = evt.getSource().getBindingContext().sPath;
		
		debugger;
		//get current table model
		var oModel = this.byId("salesTable").getModel();
		var department = oModel.getProperty(sPath);
		
		//get input fields
		var idInput = sap.ui.getCore().byId("idInput");
		var typeInput = sap.ui.getCore().byId("typeInput");
		var priceInput = sap.ui.getCore().byId("priceInput");
		var dateInput = sap.ui.getCore().byId("dateInput");
		
		//construct new entry data
		var newSale = {
			Id: idInput._getInputValue(),
			Type: typeInput._getInputValue(),
			GrossAmount: priceInput._getInputValue(),
			Date: dateInput._getInputValue()
		};
		
		//update model
		department.Sales.push(newSale);
		oModel.setProperty(sPath, department);
		
		//push updated model to table
		this.byId("salesTable").setModel(oModel);
		this.byId("salesTable").getModel().refresh(true);
		
		//close dialog
		sap.ui.getCore().byId("addSaleDialog").close();
	},
	
	cancelNewSale : function(){
		//close dialog
		sap.ui.getCore().byId("addSaleDialog").close();
	},
	
	handleAddExpense : function (evt){
		//construct buttons 
		var saveButton = new sap.m.Button("saveBtn",{
			text: "{i18n>SaveBtnText}",
			tap: [this.saveNewExpense, this]
		});
		
		var cancelButton = new sap.m.Button("cancelBtn",{
			text: "{i18n>CancelBtnText}",
			tap: [this.cancelNewExpense, this]
		});
    	
    	//construct input fields
    	var idInput = new sap.m.Input("idInput");
    	var idLabel = new sap.m.Label("idLabel", {
    		text: "{i18n>ExpensesIDColumnHeader}",
    		lableFor: "idInput"
    	});
    	
    	var typeInput = new sap.m.Input("typeInput");
    	var typeLabel = new sap.m.Label("typeLabel", {
    		text: "{i18n>ExpensesProductColumnHeader}",
    		lableFor: "typeInput"
    	});
    	
    	var priceInput = new sap.m.Input("priceInput");
    	var priceLabel = new sap.m.Label("priceLabel", {
    		text: "{i18n>ExpensesPriceColumnHeader}",
    		lableFor: "priceInput"
    	});
		
		var dateInput = new sap.m.Input("dateInput");
    	var dateLabel = new sap.m.Label("dateLabel", {
    		text: "{i18n>ExpensesDateColumnHeader}",
    		lableFor: "dateInput"
    	});
    	
		//construct dialog
		var dialog = new sap.m.Dialog("addExpenseDialog", {
				title: '{i18n>AddExpenseDialogTitle}',
				buttons: [saveButton, cancelButton],
				content: [idLabel,idInput,typeLabel,typeInput,priceLabel,priceInput,dateLabel,dateInput],
				afterClose: function() {
					dialog.destroy();
				}
		});
		

		//to get access to the global model
		this.getView().addDependent(dialog);
		dialog.open();
		
	},
	
	saveNewExpense : function(evt){
		//get model path from context
		var sPath = evt.getSource().getBindingContext().sPath;
		
		//get current table model
		var oModel = this.byId("expensesTable").getModel();
		var department = oModel.getProperty(sPath);
		
		//get input fields
		var idInput = sap.ui.getCore().byId("idInput");
		var typeInput = sap.ui.getCore().byId("typeInput");
		var priceInput = sap.ui.getCore().byId("priceInput");
		var dateInput = sap.ui.getCore().byId("dateInput");
		
		//construct new entry data
		var newExpense = {
			Id: idInput._getInputValue(),
			Type: typeInput._getInputValue(),
			GrossAmount: priceInput._getInputValue(),
			Date: dateInput._getInputValue()
		};
		
		//update model
		department.Expenses.push(newExpense);
		oModel.setProperty(sPath, department);
		
		//push updated model to table
		this.byId("expensesTable").setModel(oModel);
		this.byId("expensesTable").getModel().refresh(true);
		
		//close dialog
		sap.ui.getCore().byId("addExpenseDialog").close();
	},
	
	cancelNewExpense : function(){
		//close dialog
		sap.ui.getCore().byId("addExpenseDialog").close();
	}
	
});

