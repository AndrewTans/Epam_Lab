let infoObj = {

	lastVisitDate: dateFunc(Math.floor(Math.random() * 1000)),
	globalDiscount: Math.floor(Math.random() * 10),
	nightDiscount: Math.floor(Math.random() * 50),
	weekendDiscount: Math.floor(Math.random() * 30),
	ordersCount: 1 + Math.floor(Math.random() * 10),
	ordersTotalPrice: 10 + Math.floor(Math.random() * 1000)
}

function dateFunc(input) {

	let dateObj = new Date(new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		new Date().getHours() - input,
		new Date().getMinutes());

	let month = dateObj.getMonth() + 1;
	let day = dateObj.getDate();
	let year = dateObj.getFullYear();
	let hours = dateObj.getHours();

	return year + "/" + month + "/" + day;
}

class User {

	constructor(obj) {

		this.lastVisitDate = obj.lastVisitDate;
		this.globalDiscount = obj.globalDiscount;
		this.nightDiscount = obj.nightDiscount;
		this.weekendDiscount = obj.weekendDiscount;
		this.ordersCount = obj.ordersCount;
		this.ordersTotalPrice = obj.ordersTotalPrice;
		this.discount = this.globalDiscount;
		this.bonus = 0;
	}
}

function getDiscount(obj) {

	for (let key in obj) {
		this[key] = obj[key];
	}

	this.checkDiscount = () => {

		let calcDiscount = 0;
		if (new Date().getHours() >= 23 || new Date().getHours() <= 5) {
			this.discount += this.nightDiscount
		}
		if (new Date().getDay() === 0 || new Date().getDay() === 6) {
			this.discount += this.weekendDiscount;
		}

		calcDiscount = Math.floor(this.ordersTotalPrice - (this.ordersTotalPrice * ((this.discount + this.bonus) / 100)));
		console.log(`Full price: ${this.ordersTotalPrice}`);
		console.log(`Your discount is: ${this.discount}%`);
		console.log(`Price with discount: ${calcDiscount}`);
		return this.ordersTotalPrice = calcDiscount;
	}
}

function getBonus(obj) {

	for (let key in obj) {
		this[key] = obj[key];
	}

	this.checkLastVisit = () => {

		for (let i = 0; i < 240; i++) {
			if (dateFunc(i) === this.lastVisitDate) {
				this.bonus += Math.floor(Math.random() * 10);
				console.log(`Wow, you've got bonus becouse you were here less then 10 days ago!`);
				break;
			}
		}
		console.log(`Your bonus is: ${this.bonus}`);
		return this.bonus;
	}
}


let user = new getBonus(new getDiscount(new User(infoObj)));

user.checkDiscount();
user.checkLastVisit();