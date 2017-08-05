var assignMethod = function() {
    let newObj = {};
    for (let i = 0; i < arguments.length; i++) {
      let income = arguments[i];
        if (income === undefined || income === null) {
            continue;
        }

        var arrKeys = Object.keys(income);
        for (let j = 0; j < arrKeys.length; j++) {
            let key = arrKeys[j];
            if (key === undefined) {
              continue;
            } else {
              newObj[key] = income[key];
            }
        }
    }
    return newObj;
}

var defaults = {
    width: 100,
    height: 100
};
var options = {
    width: 150
};
var configs = assignMethod({}, defaults, options);
console.log(configs);

function prototypeGenerator(nameOfChild, fatherName) {
    nameOfChild.prototype = Object.create(fatherName.prototype);
    nameOfChild.prototype.constructor = nameOfChild;
}

function Hero(obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.maxHitpoints = obj.hitpoints;
    this.hitpoints = this.maxHitpoints;
    this.alive = true;
    this.killerPoints = 0;

    this.checkIfDead = function(income = 'zero') {

        if (income !== 'zero' && income === String(income)) {
            console.log(`Please, write correct class`);
            return false;
        }

        if (this.hitpoints <= 0) {
            console.log(`${this.name} is dead`);
            return false;
        } else if (income.hitpoints <= 0) {
            console.log(`${this.name} cant fight with ${income.name}. He is dead already`);
            return false;
        } else {
            return true;
        }
    }
    return this;
};

Hero.prototype.getHitpoints = function() {
    if (this.checkIfDead() !== true) {
        return this;
    } else {
        console.log(`${this.name} has ${this.hitpoints} HP`);
        return this.hitpoints;
    }
};

Hero.prototype.setHitpoints = function(newHitpoints) {
    if (newHitpoints > this.maxHitpoints) {
        console.log(`You cant set more then ${this.maxHitpoints} HP for ${this.name}. This is his maximum HP. So for ${this.name} was set ${this.maxHitpoints} HP`);
        return this.hitpoints = this.maxHitpoints;
    } else {
        console.log(`For ${this.name} was set ${newHitpoints} HP`);
        if (newHitpoints > 0) {
            this.alive = true;
        }
        return this.hitpoints = newHitpoints;
    }
};

Hero.prototype.getTotalHitpoints = function() {
    console.log(`${this.name}'s maximum HP is: ${this.maxHitpoints} HP`);
    return this.maxHitpoints;
};

Hero.prototype.setTotalHitpoints = function(newTotalHitpoints) {
    console.log(`You set for ${this.name} maximum HP: ${newTotalHitpoints}`);
    return this.maxHitpoints = newTotalHitpoints;
};

Hero.prototype.getAttack = function() {
    console.log(`${this.name} has ${this.attack} points of attack`);
    return this.attack;
};

Hero.prototype.setAttack = function(newAttack) {
    console.log(`You set for ${this.name} ${newAttack} points of attack`);
    return this.attack = newAttack;
};

Hero.prototype.fight = function(opponent) {

    if (this === opponent){
    	console.log(`${this.name} cant fight with himself`);
    	return this;
    } else if (this.checkIfDead(opponent) === false) {
        return this;
    } else if (opponent.defence === true) {
        console.log(`${opponent.name} has deffence, ${this.name} cant damage him`);
        console.log(`${opponent.name} has ${opponent.hitpoints} HP`);
        opponent.defence = false;
    } else if (this.becomeEnrage > 0) {
        opponent.hitpoints -= (this.attack * 2);
        console.log(`${this.name} enraged and did to ${opponent.name} ${this.attack * 2} damage`);
        this.becomeEnrage--;
    } else {
        opponent.hitpoints -= this.attack;
        console.log(`${this.name} attack ${opponent.name} and did ${this.attack} damage`);
    }

    if (opponent.hitpoints <= 0) {
        console.log(`${opponent.name} is dead`);
    } else {
        console.log(`${opponent.name} has ${opponent.hitpoints} HP`);
    }
    return this;
};

Hero.prototype.isAlive = function() {
    if (this.checkIfDead() !== true) {
        return this.alive = false;
    } else {
        console.log(`${this.name} is alive and has ${this.hitpoints} HP`);
        return this.alive = true;
    }
};

Hero.prototype.getKillerPoints = function() {
    console.log(`${this.name} killed ${this.killerPoints} units`);
    return this.killerPoints;
}

function Champion(obj) {
    Hero.call(this, obj);
    this.defence;
    return this;
};

prototypeGenerator(Champion, Hero);

Champion.prototype.fight = function(opponent) {
    Hero.prototype.fight.apply(this, arguments);
    if (opponent.hitpoints <= 0 && opponent.alive === true) {
        this.killerPoints++;
        this.attack += 1;
        console.log(`${this.name} got bonus +1 to attack for killed opponent`);
        console.log(`${this.name} has ${this.attack} attack points`)
        console.log(`${this.name} killed ${this.killerPoints} units`);
        opponent.alive = false;
    }
    return this;
};


Champion.prototype.rest = function() {
    if (this.checkIfDead() !== true) {
        return this;
    } else if (this.hitpoints + 5 <= this.maxHitpoints) {
        console.log(`${this.name} after rest got +5 HP and now ${this.name} has ${this.hitpoints + 5} HP`);
        return this.hitpoints += 5;
    } else {
        console.log(`${this.name} after rest cant get more then his total hitpoints. Now he has: ${this.hitpoints} HP`);
        return this;
    }
};

Champion.prototype.defence = function() {
    if (this.checkIfDead() !== true) {
        return this;
    } else {
        console.log(`${this.name} has got defence! He wont get damage in the next attack`);
        return this.defence = true;
    }
};

function Monster(obj) {
    Hero.call(this, obj);
    this.hitpoints = this.maxHitpoints;
    this.becomeEnrage;
    return this;
}

prototypeGenerator(Monster, Hero);

Monster.prototype.fight = function(opponent) {
    Hero.prototype.fight.apply(this, arguments);

    if (opponent.hitpoints <= 0 && opponent.alive === true) {
        this.killerPoints++;
        this.maxHitpoints += parseInt(opponent.maxHitpoints * 0.10);
        console.log(`${this.name} killed opponent and receive ${opponent.maxHitpoints * 0.25} to his HP and ${opponent.maxHitpoints * 0.10} to his max HP`);
        if (this.hitpoints + parseInt(opponent.maxHitpoints * 0.25) > this.maxHitpoints) {
            this.hitpoints = this.maxHitpoints;
        } else {
            this.hitpoints += parseInt(opponent.maxHitpoints * 0.25);
        }
        console.log(`${this.name} has ${this.hitpoints} HP and ${this.maxHitpoints} max HP`);
        console.log(`${this.name} killed ${this.killerPoints} units`);
        opponent.alive = false;
    }
    return this;
};

Monster.prototype.enrage = function() {
    if (this.checkIfDead() !== true) {
        return this;
    } else {
        console.log(`${this.name} become enraged! He will do double damage next 2 rounds! His attack will be: ${this.attack * 2}`);
        this.becomeEnrage = 2;
        return this;
    }
};

function gameDemonstration() {

    var heracles = new Champion({
        name: 'Heracles',
        attack: 10,
        hitpoints: 100
    });
    var boar = new Monster({
        name: 'Erymanthian Boar',
        attack: 10,
        hitpoints: 100
    });

    console.log(heracles);
    console.log(boar);
    heracles.getTotalHitpoints();
    heracles.getHitpoints();
    heracles.getAttack();
    heracles.fight(boar);
    boar.fight(heracles);
    heracles.rest();
    heracles.setAttack(45);
    heracles.fight(boar);
    heracles.fight(boar);
    heracles.fight(boar);
    heracles.rest();
    boar.isAlive();
    boar.setHitpoints(100);
    boar.isAlive();
    boar.setAttack(35);
    boar.enrage();
    boar.fight(heracles);
    heracles.defence();
    boar.fight(heracles);
    heracles.rest();
    boar.fight(heracles);
    heracles.setTotalHitpoints(300);
    heracles.setHitpoints(350);
    heracles.isAlive();
    heracles.getKillerPoints();
    boar.getKillerPoints();
}

gameDemonstration();

// module.exports = {
//     assignMethod: assignMethod,
//     prototypeGenerator: prototypeGenerator,
//     Hero: Hero,
//     Champion: Champion,
//     Monster: Monster,
//     gameDemonstration: gameDemonstration
// }