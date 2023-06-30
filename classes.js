// Knight ou Sorcerer
// LittleMonster ou BigMonster

class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;


    constructor(name){
        this.name = name;
    }

    //  Avoid Life's value became minus than zero
    get life(){
        return this._life;
    }
    //  if newLife < 0 --> print 0, else print the value itself
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }
}

//  Personal characteristics of each player

class Knight extends Character{
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 14;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character{
    constructor(){
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character{
    constructor(){
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage{
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject; 
    }

    start(){
        //  TODO: Evento do botão de atacar
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

    }

    //  update the life's bars
    update(){
        //  Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.life} HP`;
        //  Sum of life
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        //  Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.life} HP`;
        //  Sum of life
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked){
        //  checking if they are alive
        if(attacking.life <= 0 || attacked.life <= 0 ){
            this.log.addMessage('Attacking dead one.');
            return;
        }

        //  multiply an random value for attack and defense
        let attackFactor = (Math.random() * 2).toFixed(1);
        let defenseFactor = (Math.random() * 2).toFixed(1);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
            //  reduces the life as the value of attack
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} caused ${actualAttack.toFixed(2)} damage on ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} Defended...`)
        }

        this.update();
    }
    
}

class Log{
    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        //  add message on array
        this.list.push(msg);
        //  show the information from list[] to the screen
        this.render();
    }

    render(){
        //  clear what is in the HTML
        this.listEl.innerHTML = '';

        //Fullfill the HTML
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}