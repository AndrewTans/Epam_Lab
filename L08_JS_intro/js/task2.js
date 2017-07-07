var dollar = prompt('put amount of dollars', 1000);
	dollar = parseFloat(dollar);
var euro = prompt('put amount of euros', 1000);
	euro = parseFloat(euro);


var dol_grn_rate = 26.15;
var euro_grn_rate = 29.8;
var euro_dol_rate = 1.12;

var dol_to_grn = dollar * dol_grn_rate;
var euro_to_grn = euro * euro_grn_rate;

alert(euro + ' euros are equal ' + euro_to_grn + ' grns, '+ dollar + ' dollars are equal ' + dol_to_grn + ' grns, one euro is equal ' + euro_dol_rate + ' dollars.');