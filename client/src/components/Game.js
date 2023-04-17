import React, { useState } from 'react'
import GameBoard from './GameBoard';


function Game({ channel }) {
    const [playesJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2)

    channel.on("user.watching.start", (event) => { //one user start, other user will go to game automatically
        setPlayersJoined(event.watcher_count === 2);
    })

    if (!playesJoined) {    //if all players are not connected
        return <div> Waiting for other player....</div>;
    }
    return (
        <div className='gameContainer'>
            <GameBoard />
            {/* Player Chat */}

            {/* Leave game button */}

            
        </div>
    )
}

export default Game;