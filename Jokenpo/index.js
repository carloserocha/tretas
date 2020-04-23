const possibilites = require('./possibilities')

const main = () => {
    const { playes } = possibilites

    let play_player_one = 'stone'
    let play_player_two = 'scissors'

    let exit = null
    if (play_player_one === play_player_two) {
        exit = 'no winner'
    }

    if (playes[play_player_one] === play_player_two) {
        exit = 'the winner is player two'
    } else if (playes[play_player_two] === play_player_one) {
        exit = 'the winner is player one'
    }

    return exit
}

console.log (
    main()
)
