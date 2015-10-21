jQuery.sap.declare("sap.ui.demo.myFiori.util.Formatter");

sap.ui.demo.myFiori.util.Formatter = {

	totalSales :  function (sales) {
		if(sales){
			var total=0;
			for (var i =0; i < sales.length; i++) {
				total += parseInt(sales[i].GrossAmount);
			}
			return total;
		} else {
			return sales
		}
	},
	

	
	totalExpenses :  function (expenses) {
		if(expenses){
			var total=0;
			for (var i =0; i < expenses.length; i++) {
				total += parseInt(expenses[i].GrossAmount);
			}
			return total;
		} else {
			return expenses
		}
	},
	
	inBudget: function (sales, expenses){
		if(expenses && sales){
			var totalSales = 0;
			for (var i =0; i < sales.length; i++) {
					totalSales += parseInt(sales[i].GrossAmount);
			}
			var totalExpenses = 0;
			for (var i =0; i < expenses.length; i++) {
					totalExpenses += parseInt(expenses[i].GrossAmount);
			}
			if(totalSales > totalExpenses){
				return "On Budget! :)"
			} else {
				return "No On Budget! :("
			}
		} else {
			return "No Data"
		}
	}
};