let log = new Log(document.querySelector('.log'));

let char = new Knight('Warrior');
let monster = new BigMonster();

const stage = new Stage(
    //  Fighter 1
    char,
    //  Fighter 2
    monster,
    //  Elements of warriors (change in screen)
    document.querySelector('#char'),
    document.querySelector('#monster'),
    //  receive the parameter log
    log

);

stage.start();