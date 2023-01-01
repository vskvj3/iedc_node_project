const express = require('express');



const app = express();


app.get('/game/start', (req, res)=> {
    let xr = createPlayers()
    res.send({'players': xr})
});


let rockPaperScissor = (name)=> {
    const moves = ['rock', 'paper', 'scissors']; 
    return {'name': name, 'value':moves[Math.floor(Math.random()*3)]}


}

let createPlayers = ()=> {
    let player1 = rockPaperScissor('player1');
    let player2 = rockPaperScissor('player2');
    let player3 = rockPaperScissor('player3');
    let player4 = rockPaperScissor('player4');

    let result = [player1, player2, player3, player4]

    return result
}

let winner = (player1, player2)=> {
    p1 = player1.value
    p2 = player2.value
    x = null
    if(p1===p2){
        x = 'tie'
    }else if(p1 === 'rock'){
        if(p2 === 'paper') {
            x = player2
        } else{
            x = player1
        }
    }else if(p1 === 'paper'){
        if(p2 === 'rock'){
            x = player1
        } else{
            x = player2
        }
    }else if(p1 === 'scissors'){
        if(p2 === 'rock'){
            x = player2
        }else{
            x = player1
        }
    }

    return x;
}

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})