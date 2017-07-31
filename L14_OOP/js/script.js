(function CasinoGame() {

    function Casino(slotMachines, initial_money) {
        this.machine = [];

        if (parseInt(initial_money) != initial_money) {
            console.log('Sorry but we dont accept coints less then 1 dollar!');
            return false;
        } else if (initial_money < slotMachines) {
            console.log('You should pass minimum 1 dollar for each machine!');
            return false;
        } else if (typeof slotMachines !== "number" || typeof initial_money !== "number") {
            console.log('Sorry, but we accept only numbers!');
            return false;
        }

        let luckyRandom = Math.floor(Math.random() * slotMachines);
        let tempMoney;
        let moneyForFirstMachine = 0;
        while (parseInt(initial_money / slotMachines) != (initial_money / slotMachines)) {
            initial_money--;
            moneyForFirstMachine++;
        }
        var equalMoney = initial_money / slotMachines;
        for (let i = 0; i < slotMachines; i++) {
            if (i === 0) {
                tempMoney = equalMoney + moneyForFirstMachine;
            } else {
                tempMoney = equalMoney;
            }
            this.machine[i] = new SlotMachine(tempMoney);
            this.machine[i].machineNumber = i + 1;
            if (luckyRandom === i) {
                this.machine[i].isLucky = true;
            } else {
                this.machine[i].isLucky = false;
            }
            console.log(`Added machine number: ${this.machine[i].machineNumber}, Lucky: ${this.machine[i].isLucky}, money: ${this.machine[i].moneyMachine}$`);
        };
        console.log(this.machine);


        this.slotMachines = slotMachines;
        this.initial_money = initial_money;



        this.getTotalMoneyCasino = function() {
            var sum = 0;
            for (let i = 0; i < this.machine.length; i++) {
                sum += this.machine[i].moneyMachine;
            }
            console.log(`Total money in Casino: ${sum}`);
            return this;
        }

        this.getTotalMachines = function() {
            console.log(`Total Slot Machines in Casino: ${this.slotMachines}`);
            return this;
        }

        this.addNewMachine = function() {
            var maxMoney = this.machine[0].moneyMachine;
            for (let i = 0; i < this.machine.length; i++) {
                if (maxMoney < this.machine[i].moneyMachine) {
                    maxMoney = this.machine[i].moneyMachine
                }
            }

            var newNum = this.machine.length;
            var halfMoney = (maxMoney / 2) ^ 0;
            this.machine[newNum] = new SlotMachine(halfMoney);
            this.machine[newNum].machineNumber = newNum + 1;
            this.machine[newNum].isLucky = false;
            console.log('added machine with number: ' + this.machine[newNum].machineNumber)
            return this;
        }


        this.removeMachine = function(delId) {
            var machine_was_found;
            for (let i = 0; i < this.machine.length; i++) {
                if (delId == this.machine[i].machineNumber) {
                    machine_was_found = this.machine[i].machineNumber;
                    console.log('you removed machine with number ' + delId)
                    this.machine.splice(i, 1);
                }
            }
            if (machine_was_found == null) {
                console.log('Unable to find machine with number: ' + delId);
            }
            console.log(this.machine);
            return this;
        }

        this.takeCasinoMoney = function(moneyTake) {

            let sumTemp = 0;
            let moneyTaker = moneyTake;
            let maxMoney;
            for (let i = 0; i < this.machine.length; i++) {
                sumTemp += this.machine[i].moneyMachine;

            }
            console.log(sumTemp);
            if (moneyTake > sumTemp) {
                console.log(`You can't take so much. Casino has only: ${sumTemp}$`);
                return false;
            }

            this.machine = this.machine.sort(function(a, b) {
                return b.moneyMachine - a.moneyMachine;
            });

            for (let i = 0; i < this.machine.length; i++) {
                if (moneyTaker >= this.machine[i].moneyMachine) {
                    moneyTaker = moneyTaker - this.machine[i].moneyMachine;
                    this.machine[i].moneyMachine = 0;
                    continue;
                } else if (moneyTaker > 0) {
                    this.machine[i].moneyMachine -= moneyTaker;
                    moneyTaker = 0;
                    continue;
                }
            }
            console.log(`You took ${moneyTake} from machines. Current balance: ${sumTemp - moneyTake}`);
            this.machine = this.machine.sort(function(a, b) {
                return a.machineNumber - b.machineNumber;
            });
            return this;
        }
    }


    function SlotMachine(initial_money_machine) {

        this.moneyMachine = initial_money_machine;

        this.getTotalMoneyMachine = function() {
            console.log(this.machineNumber + ' ' + this.isLucky);
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
            console.log(putMoney);
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
            return this;
        }
    }


    function demonstration(machineNumber) {
        let startMoney = Math.floor(Math.random() * 50000);
        let money = Math.floor(Math.random() * 5000);
        let randomMachine = Math.floor(Math.random() * machineNumber);

        var Casik = new Casino(machineNumber, startMoney);
        Casik.getTotalMoneyCasino().getTotalMachines().addNewMachine().removeMachine(randomMachine).takeCasinoMoney(money);
        Casik.machine[randomMachine].getTotalMoneyMachine(money).takeMoneyFromMachine(money).putMoneyToMachine(money).play(money);
        Casik.getTotalMoneyCasino();

        // Casik.getTotalMoneyCasino();
        // Casik.getTotalMachines();
        // Casik.addNewMachine();
        // Casik.removeMachine(randomMachine);
        // Casik.takeCasinoMoney(money);
        // Casik.machine[randomMachine].getTotalMoneyMachine(money);
        // Casik.machine[randomMachine].takeMoneyFromMachine(money);
        // Casik.machine[randomMachine].putMoneyToMachine(money);
        // Casik.machine[randomMachine].play(money);
        // Casik.getTotalMoneyCasino();
    }

    demonstration(5);

})();

// module.exports = CasinoGame;