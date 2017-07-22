var people = [
	{name: 'Bara', income: '1B'},
	{name: 'Dara', income: '5B'},
	{name: 'Kara', income: '1M'},
	{name: 'Zara', income: '2K'}
];

function getTopNRichestNames(number, people){
	let i = 0;
	var array_income = [];

	people = people.map(function(el){
		while(i < number){
			i++;
			var money = el.income;
			money_parse = parseInt(money);

			if (money.match('B')){
				money_parse = money.replace('B', 1e8) - 1e8;
				el.income = money_parse;
			} else if (money.match('M')){
				money_parse = money.replace('M', 1e5) - 1e5;
				el.income = money_parse;
			} else if (money.match('K')){
				money_parse = money.replace('K', 1e2) - 1e2;
				el.income = money_parse;
			}
		return  array_income.push({
				name: el.name,
				income: el.income
				});
		}
	});

	array_income.sort(function(a, b) {
  		return b.income - a.income;
	});
	
	return pluckByAttribute (array_income, 'name');
}

console.log(getTopNRichestNames(2, people));