function Casino(slotMachines, initialMoney) {
	this.machineArr = [];
	this.slotMachines = slotMachines;
	this.initialMoney = initialMoney;

	if (parseInt(this.initialMoney) != this.initialMoney || parseInt(this.slotMachines) != this.slotMachines || this.slotMachines < 1) {
		console.log('Sorry, but it must be positive integer!');
		return false;
	} else if (this.initialMoney < this.slotMachines) {
		console.log('You should pass minimum 1 dollar for each machine!');
		return false;
	} else if (typeof(this.slotMachines) !== "number" || typeof(this.initialMoney) !== "number") {
		console.log('Sorry, it must be a number!');
		return false;
	}


	let luckyRandom = Math.floor(Math.random() * this.slotMachines);
	let tempMoney;
	let moneyForFirstMachine = 0;
	while (parseInt(this.initialMoney / this.slotMachines) != (this.initialMoney / this.slotMachines)) {
		this.initialMoney--;
		moneyForFirstMachine++;
	}
	var equalMoney = this.initialMoney / this.slotMachines;
	for (let i = 0; i < this.slotMachines; i++) {
		if (i === 0) {
			tempMoney = equalMoney + moneyForFirstMachine;
		} else {
			tempMoney = equalMoney;
		}
		this.machineArr[i] = new SlotMachine(tempMoney);
		this.machineArr[i].machineNumber = i + 1;
		if (luckyRandom === i) {
			this.machineArr[i].isLucky = true;
		} else {
			this.machineArr[i].isLucky = false;
		}
		console.log(`Added machine number: ${this.machineArr[i].machineNumber}, Lucky: ${this.machineArr[i].isLucky}, money: ${this.machineArr[i].moneyMachine}$`);
	};
	// to show array of machines
	console.log(this.machineArr);

	this.getTotalMoneyCasino = function() {
		var sum = 0;

		for (let i = 0; i < this.machineArr.length; i++) {
			sum += this.machineArr[i].moneyMachine;
		}
		console.log(`Total money in Casino: ${sum}`);
		return this;
	}

	this.getTotalMachines = function() {
		console.log(`Total Slot Machines in Casino: ${this.machineArr.length}`);
		return this;
	}

	this.addNewMachine = function() {
		var numChecker = 0
		var maxMoney = this.machineArr[numChecker].moneyMachine;
		var newNum = this.machineArr.length;
		var tempNum = newNum + 1;
		var halfMoney;

		for (let i = 0; i < this.machineArr.length; i++) {
			if (maxMoney < this.machineArr[i].moneyMachine) {
				maxMoney = this.machineArr[i].moneyMachine;
				numChecker = i;
			}
		}

		this.machineArr[numChecker].moneyMachine = (maxMoney / 2) ^ 0;

		halfMoney = (maxMoney / 2) ^ 0;
		this.machineArr[newNum] = new SlotMachine(halfMoney);
		for (let i = 0; i < newNum; i++) {
			// to make unique number
			if (this.machineArr[i].machineNumber === tempNum) {
				tempNum++;
				i = 0;
			}
		}
		this.machineArr[newNum].machineNumber = tempNum;
		this.machineArr[newNum].isLucky = false;
		console.log(`Added machine with number: ${this.machineArr[newNum].machineNumber}. Machine balance: ${this.machineArr[newNum].moneyMachine}$`);
		return this;
	}


	this.removeMachine = function(delId) {
		var machine_was_found;
		var machineTempMoney;

		if (this.machineArr.length === 1) {
			console.log('Sorry, but you cant remove last machine in casino');
			return this;
		} else if (checkIfNumber(delId) === true) {
			for (let i = 0; i < this.machineArr.length; i++) {
				if (delId == this.machineArr[i].machineNumber) {
					machine_was_found = this.machineArr[i].machineNumber;
					machineTempMoney = this.machineArr[i].moneyMachine;
					this.machineArr[i].moneyMachine = 0;
					console.log(`You removed machine with number ${delId} and spread ${machineTempMoney}$ between other machines`);
					this.machineArr.splice(i, 1);
				}
			}

			if (machine_was_found == null) {
				console.log(`Unable to find machine with number: ${delId}`);
			} else {
				machineTempMoney = parseInt(machineTempMoney / this.machineArr.length);
				for (let i = 0; i < this.machineArr.length; i++) {
					this.machineArr[i].moneyMachine += (machineTempMoney);
				}
			}
			// to show array of machines after delete
			console.log(this.machineArr);
		}
		return this;
	}

	this.takeCasinoMoney = function(moneyTake) {

		if (checkIfNumber(moneyTake) === true) {
			let sumTemp = 0;
			let moneyTaker = moneyTake;
			let maxMoney;
			for (let i = 0; i < this.machineArr.length; i++) {
				sumTemp += this.machineArr[i].moneyMachine;
			}

			if (moneyTake > sumTemp) {
				console.log(`You can't take so much. Casino has only: ${sumTemp}$`);
				return false;
			}

			this.machineArr = this.machineArr.sort(function(a, b) {
				return b.moneyMachine - a.moneyMachine;
			});

			for (let i = 0; i < this.machineArr.length; i++) {
				if (moneyTaker >= this.machineArr[i].moneyMachine) {
					moneyTaker = moneyTaker - this.machineArr[i].moneyMachine;
					this.machineArr[i].moneyMachine = 0;
					continue;
				} else if (moneyTaker > 0) {
					this.machineArr[i].moneyMachine -= moneyTaker;
					moneyTaker = 0;
					continue;
				}
			}
			console.log(`You took ${moneyTake}$ from machines. Current balance: ${sumTemp - moneyTake}$`);
			this.machineArr = this.machineArr.sort(function(a, b) {
				return a.machineNumber - b.machineNumber;
			});
		}
		return this;
	}

	// this function is checking if number is not less than 0 and it must be a number
	function checkIfNumber(incomeInteger) {

		if (typeof(incomeInteger) !== 'number') {
			console.log('Sorry, it must be a number!');
			return false;
		} else if (incomeInteger < 0) {
			console.log('It cant be less then 0');
			return false;
		} else {
			return true;
		}
	}
}


function SlotMachine(initialMoneyMachile) {

	this.moneyMachine = initialMoneyMachile;

	this.getTotalMoneyMachine = function() {
		console.log(`Total amount of money in machine number ${this.machineNumber}: ${this.moneyMachine}$`);
		return this;
	}

	this.takeMoneyFromMachine = function(takeMoneyFromM) {

		if (checkIfNumberM(takeMoneyFromM) === true) {
			if (takeMoneyFromM > this.moneyMachine) {
				console.log(`You couldn't take so much, this machine has only ${this.moneyMachine}$`);
			} else {
				this.moneyMachine -= takeMoneyFromM;
				console.log(`You took ${takeMoneyFromM}$ from machine number ${this.machineNumber}`);
				console.log(`Current balance in machine number ${this.machineNumber}: ${this.moneyMachine}`);
			}
		}
		return this;
	}

	this.putMoneyToMachine = function(putMoney) {

		if (checkIfNumberM(putMoney) === true) {
			this.moneyMachine += putMoney;
			console.log(`You put ${putMoney}$ to machine number ${this.machineNumber}`);
			console.log(`Current balance in machine number ${this.machineNumber}: ${this.moneyMachine}`);
		}
		return this;
	}

	this.play = function(playMoney) {

		if (checkIfNumberM(playMoney) === true) {
			let totalMachineMoney = this.moneyMachine + playMoney;
			let matched = 0;
			let award = 0;
			let playRandom = [];

			if (totalMachineMoney < playMoney * 5) {
				console.log(`Sorry but ${playMoney} is too much and this machine has not enough money to play with you`);
				return this;
			}
			console.log(`Thanks! You put ${playMoney}$ to play`);
			for (let i = 0; i < 3; i++) {

				playRandom[i] = Math.floor(Math.random() * 9);

				if (this.isLucky == true && playRandom.join('') === '777') {
					console.log(`Wow! Here is 777, but this machine not lucky :(, so it will be changed`);
					i = 0;
				}

				if (playRandom[i] === playRandom[i - 1] || playRandom[i] === playRandom[i - 2]) {
					matched++;
				}
			}
			if (playRandom.join('') === '777') {
				matched = 777;
			}
			console.log(`And the result is... | ${playRandom.join('')} |`);

			switch (matched) {
				case 1:
					award = playMoney * 2;
					console.log('Congratulations! 2 numbers matched!');
					break;
				case 2:
					award = playMoney * 5;
					console.log('Congratulations! 3 numbers matched!');
					break;
				case 777:
					award = totalMachineMoney;
					console.log(`You have got 777 and you receive all money from this machine: ${totalMachineMoney}$`);
					break;
				default:
					console.log('Sorry but you lost. Try again!');
					break;
			}
			console.log(`Your award: ${award}$`)
			this.moneyMachine = totalMachineMoney - award;
		}
		return this;
	}

	// again function to check if its not less then 0 and is a number. We should't use inheritance here so that is why i wrote this function again
	function checkIfNumberM(incomeInteger) {

		if (typeof(incomeInteger) !== 'number') {
			console.log('Sorry, it must be a number!');
			return false;
		} else if (incomeInteger < 0) {
			console.log(`It couldnt be less then 0`);
			return false;
		} else {
			return true;
		}
	}
}

// this function will show you how casino works
function demonstration(machineNumber) {
	let startMoney = Math.floor(Math.random() * 50000);
	// to generate random sum of money for casino to give an example how its work
	let money = Math.floor(Math.random() * 5000);
	// to generate random sum of money to play with casino and put it to machines
	let randomMachine = Math.floor(Math.random() * machineNumber);
	// to generate random number to choose any of created machines

	var CasinoDemo = new Casino(machineNumber, startMoney);
	CasinoDemo.getTotalMoneyCasino().getTotalMachines().addNewMachine().removeMachine(randomMachine).takeCasinoMoney(money);
	CasinoDemo.machineArr[randomMachine].getTotalMoneyMachine(money).takeMoneyFromMachine(money).putMoneyToMachine(money).play(money);
	CasinoDemo.getTotalMoneyCasino();
}

demonstration(5);


// module.exports = {
//   Casino: Casino,
//   SlotMachine: SlotMachine,
//   demonstration: demonstration
// }