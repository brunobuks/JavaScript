const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createMarksMan = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 17,
        defense: 6
    }
}

const createTank = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 120,
        maxLife: 120,
        attack: 8,
        defense: 12
    }
}

const createLittleMonster = (name) => {
    return {
        ...defaultCharacter,
        name: 'Minion',
        life: 100,
        maxLife: 100,
        attack: 5,
        defense: 5
    }
}

const createBigMonster = (name) => {
    return {
        ...defaultCharacter,
        name: 'Boss',
        life: 120,
        maxLife: 120,
        attack: 12,
        defense: 8
    }
}

const stage = {
    fighter01: null,
    fighter02: null,
    fighter01EL: null,
    fighter02EL: null,

    start(fighter01, fighter02, fighter01EL, fighter02EL) {
        this.fighter01 = fighter01
        this.fighter02 = fighter02
        this.fighter01EL = fighter01EL
        this.fighter02EL = fighter02EL

        this.fighter01EL.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter01, this.fighter02))
        this.fighter02EL.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter02, this.fighter01))

        this.update()
    },

    update() {
        this.fighter01EL.querySelector('.name').innerHTML = `${this.fighter01.name} - ${this.fighter01.life.toFixed(1)} HP`
        let f1 = (this.fighter01.life / this.fighter01.maxLife) * 100
        this.fighter01EL.querySelector('.bar').style.width = `${f1}%`

        this.fighter02EL.querySelector('.name').innerHTML = `${this.fighter02.name} - ${this.fighter02.life.toFixed(1)} HP`
        let f2 = (this.fighter02.life / this.fighter02.maxLife) * 100
        this.fighter02EL.querySelector('.bar').style.width = `${f2}%`
    },

    doAttack(attacking, attacked) {
        if(attacking.life <= 0) {
            log.addMenssage(`${attacking.name} is dead`)
            return
        } if(attacked.life <= 0) {
            log.addMenssage(`${attacked.name} is dead`)
            return
        }

        const attackFactor = (Math.random() * 2).toFixed(2)
        const defenseFactor = (Math.random() * 2).toFixed(2)

        const actualAttack = attacking.attack * attackFactor
        const actualDefense = attacked.defense * defenseFactor

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack
            attacked.life = attacked.life < 0 ? 0 : attacked.life
            log.addMenssage(`${attacking.name} has caused ${actualAttack.toFixed(2)} in ${attacked.name}`)
        } else {
            log.addMenssage(`${attacked.name} has Defended`)
        }

        this.update()
    }
}

const log = {
    list: [],
    addMenssage(msg) {
        this.list.push(msg)
        this.render()
    },
    render() {
        const logEL = document.querySelector('.log')
        logEL.innerHTML = ''

        for(let i in this.list) {
            logEL.innerHTML += `<li>${this.list[i]}</li>`
        }

        logEL.scrollTop = logEL.scrollHeight
    }
}