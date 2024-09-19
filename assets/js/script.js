let log = new Log(document.querySelector('.log'))

let char = new Wizard('Smily')
let monster = new BigMonster('Boss')

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

stage.start()