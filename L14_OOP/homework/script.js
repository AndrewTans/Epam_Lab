(function CasinoGame(){

var machine = [];


function Casino(slotMachines, initial_money) {
    if (parseInt(initial_money) != initial_money) {
        console.log('Sorry but we dont accept coints less then 1 dollar!');
        return false;
    } else if (initial_money < slotMachines) {
        console.log('You should pass minimum 1 dollar for each machine!');
        return false;
    } else if (typeof slotMachines !== "number" || typeof initial_money !== "number"){
       console.log('Sorry, but we accept only numbers!'); 
       return false;
    };

    var luckyRandom = Math.floor(Math.random() * slotMachines);
    var moneyForFirstMachine = 0;
    while (parseInt(initial_money / slotMachines) != (initial_money / slotMachines)) {
        initial_money--;
        moneyForFirstMachine++;
    }
    var equalMoney = initial_money / slotMachines;
    for (let i = 0; i < slotMachines; i++) {
        machine[i] = new SlotMachine(equalMoney)
        if (luckyRandom === i) {
            machine[i].isLucky = true;
        } else {
            machine[i].isLucky = false;
        }
        machine[i].machineNumber = i;
        if (i === 0) {
            machine[i].moneyMachine = equalMoney + moneyForFirstMachine;
        } else {
            machine[i].moneyMachine = equalMoney;
        }
        console.log(`Machine number: ${machine[i].machineNumber}, Lucky: ${machine[i].isLucky}, money: ${machine[i].moneyMachine}$`);
    };
    console.log(machine);


    var _slotMs = slotMachines;
    var _money = initial_money;



    this.getTotalMoneyCasino = function() {
        var sum = 0;
        for (let i = 0; i < machine.length; i++) {
            sum += machine[i].moneyMachine;
        }
        console.log(`Total money in Casino: ${sum}`);
        return this;
    };

    this.getTotalMachines = function() {
        console.log(`Total Slot Machines in Casino: ${_slotMs}`);
        return this;
    };

    this.addNewMachine = function() {
        let lucky = Math.floor(Math.random() * 2);

        if (lucky === 1) {
            lucky = true;
        } else {
            lucky = false;
        }
        var maxMoney = machine[0].moneyMachine;
        for (let i = 0; i < machine.length; i++) {
            if (maxMoney < machine[i].moneyMachine) {
                maxMoney = machine[i].moneyMachine
            }
        }

        var newNum = machine.length;
        machine[newNum] = new SlotMachine(maxMoney);
        machine[newNum].machineNumber = newNum;
        machine[newNum].isLucky = lucky;
        machine[newNum].moneyMachine = (maxMoney / 2) ^ 0;
        console.log('added machine with id: ' + newNum)
        console.log(machine);
        return this;
    };


    this.removeMachine = function(delId) {
        var machine_was_found;
        for (let i = 0; i < machine.length; i++) {
            if (delId == machine[i].machineNumber) {
                machine_was_found = machine[i].machineNumber;
                console.log('you removed machine with id ' + delId)
                machine.splice(i, 1);
            }
        }
        if (machine_was_found == null) {
            console.log('Unable to find machine with id: ' + delId);
        }
        console.log(machine);
        return this;
    };

    this.takeCasinoMoney = function(moneyTake) {
    	let sumTemp = 0;
    	let moneyTaker = moneyTake;
    	let maxMoney;
    	for (let i = 0; i < machine.length; i++) {
            sumTemp += machine[i].moneyMachine;
        };
        console.log(sumTemp);
    	if(moneyTake > sumTemp){
    		console.log(`You can't take so much. Casino has only: ${sumTemp}$`);
    		return false;
    	};

    machine = machine.sort(function(a,b){
    	return b.moneyMachine - a.moneyMachine;
    });

    for(let i = 0; i < machine.length; i++){
    	// console.log(moneyTaker);
    	if(moneyTaker >= machine[i].moneyMachine){
			moneyTaker = moneyTaker - machine[i].moneyMachine;
			machine[i].moneyMachine = 0;
			continue;
    	} else if (moneyTaker > 0){
    		machine[i].moneyMachine -= moneyTaker;
    		moneyTaker = 0;
    		   // console.log(machine[i].moneyMachine);
    		continue;
    	}
    };
    	console.log(`You took ${moneyTake} from machines. Current balance: ${sumTemp - moneyTake}`);
    machine = machine.sort(function(a,b){
    	return a.machineNumber - b.machineNumber;
    });
        return this;
    };
}


function SlotMachine(initial_money_machine) {
    var machineNumber;
    var isLucky;
    var moneyMachine = initial_money_machine;

    this.getTotalMoneyMachine = function() {
        console.log(`Total amount of money in machine number ${this.machineNumber}: ${this.moneyMachine}$`);
        return this;
    }

    this.takeMoneyFromMachine = function(takeMoneyFromM) {
        if (takeMoneyFromM > this.moneyMachine) {
            console.log(`You cant take so much, this machine has only ${this.moneyMachine}$`);
        } else {
            this.moneyMachine -= takeMoneyFromM;
            console.log(`You have taken ${takeMoneyFromM}$ from machine number ${this.machineNumber}`);
            console.log(`Current balance in machine number ${this.machineNumber}: ${this.moneyMachine}`);
        }
        return this;
    }

    this.putMoneyToMachine = function(putMoney) {
        this.moneyMachine += putMoney;
        console.log(`You have put ${putMoney}$ to machine number ${this.machineNumber}`);
        console.log(`Current balance in machine number ${this.machineNumber}: ${this.moneyMachine}`);
        return this;
    }

    this.play = function(playMoney) {
        let totalMachineMoney = this.moneyMachine + playMoney;
        let matched = 0;
        let award = 0;
        let playRandom = [];

        if (totalMachineMoney < playMoney * 5) {
            console.log(`Sorry but ${playMoney} is too much and this machine has not enough money to play with you`);
            return this;
        }
        console.log(`Thanks! You put ${playMoney} to play`);
        for (let i = 0; i < 3; i++) {

            playRandom[i] = Math.floor(Math.random() * 9);

            if (this.isLucky != true && playRandom.join('') === '777') {
                console.log(`Wow! Here is 777, but this machine not lucky :(, so it will be changed`);
                i = 0;
            }

            if (playRandom[i] === playRandom[i - 1] || playRandom[i] === playRandom[i - 2]) {
                matched++;
            }
        }
		if (playRandom.join('') === '777'){
			matched = 777;
		}
        console.log(`And the result is.. ${playRandom.join('')}`);

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
                console.log('Sorry but u have lost. Try again!');
                break;
        }
        console.log(`Ваш виграш: ${award}$`)
        this.moneyMachine = totalMachineMoney - award;
        console.log(machine);
        return this;
    }
}


function demonstration(machineNumber){
let startMoney = Math.floor(Math.random() * 50000);
let money = Math.floor(Math.random() * 5000);
let randomMachine = Math.floor(Math.random() * machineNumber);

var Casik = new Casino(machineNumber, startMoney);
Casik.getTotalMoneyCasino().getTotalMachines().addNewMachine().removeMachine(randomMachine).takeCasinoMoney(money);
machine[randomMachine].getTotalMoneyMachine().takeMoneyFromMachine(money).putMoneyToMachine(money).play(money);
Casik.getTotalMoneyCasino().takeCasinoMoney(money).getTotalMoneyCasino();
}

demonstration(5);

})();

