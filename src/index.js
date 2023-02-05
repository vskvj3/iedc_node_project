const express = require('express');



const app = express();


app.get('/game/start', (req, res)=> {
    let result = loop50()

    res.send(result)
});


let rockPaperScissor = (name)=> {
    const moves = ['rock', 'paper', 'scissors']; 
    return {name: name, value:moves[Math.floor(Math.random()*3)]}


}

let loop50 = ()=>{
    let result = {}
    for(let i=0; i < 50; i++){
        let Players = createPlayers();
         let winners = play(Players)

        let choices = {}
        for(j=0; j<4; j++){
            
            choices[Players[j].name] = Players[j].value
        }

        //console.log(winners)
        result["iteration" + `${i+1}`] = {"choice": choices, "winner": winners}
    }

    return result
}

// create 4 players and assign a choice
let createPlayers = ()=> {
    let player1 = rockPaperScissor('player1');
    let player2 = rockPaperScissor('player2');
    let player3 = rockPaperScissor('player3');
    let player4 = rockPaperScissor('player4');

    let result = [player1, player2, player3, player4]

    //console.log(result)
    return result

}

// play the game and find the winners
let play = (players)=> {
    
    let player1VSplayer2 = winner(players[0], players[1])
    let player1VSplayer3 = winner(players[0], players[2])
    let player1VSplayer4 = winner(players[0], players[3])
    let player2VSplayer3 = winner(players[1], players[2])
    let player2VSplayer4 = winner(players[1], players[3])
    let player3VSplayer4 = winner(players[2], players[3])

    let result = {
        "player1 vs player2": player1VSplayer2.name,
        "player1 vs player3": player1VSplayer3.name,
        "player1 vs player4": player1VSplayer4.name,
        "player2 vs player3": player2VSplayer3.name,
        "player2 vs player4": player2VSplayer4.name,
        "player3 vs player4": player3VSplayer4.name
    }

    //console.log(result)
    return result;
}

// find the winner of a single game
let winner = (player1, player2)=> {
    p1 = player1.value
    p2 = player2.value
    //x = null
    if(p1===p2){
        x = {name: 'tie'}
    }else if(p1 === 'rock'){
        if(p2 === 'paper') {
            x = player2
        } else if(p2 === 'scissors'){
            x = player1
        }
    }else if(p1 === 'paper'){
        if(p2 === 'rock'){
            x = player1
        } else if(p2 === 'scissors'){
            x = player2
        }
    }else if(p1 === 'scissors'){
        if(p2 === 'rock'){
            x = player2
        }else if(p2 === 'paper'){
            x =  player1
        }
    }

    console.log(x)
    return x;
}

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})