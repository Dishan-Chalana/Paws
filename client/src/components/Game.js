import React, { useState } from 'react'
import GameBoard from './GameBoard';
import {Window, MessageList, MessageInput} from "stream-chat-react"
import "./Chat.css";


function Game({ channel }) {
    const [playesJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2)

    const [result, setResult] = useState({winner: "none", state: "none"}); //no winner at beginning

    channel.on("user.watching.start", (event) => { //one user start, other user will go to game automatically
        setPlayersJoined(event.watcher_count === 2);
    })

    if (!playesJoined) {    //if all players are not connected
        return <div> Waiting for other player....</div>;
    }
    return (
        <div className='gameContainer'>
            <GameBoard result={result} setResult={setResult}/>
            {/* Player Chat */}
            <Window>
                {/* chat list features */}
                <MessageList 
                disableDateSeparator 
                closeReactionSelectorOnClick 
                messageActions={["react"]}
                hideDeletedMessages

                />
                <MessageInput noFiles/>
            </Window>

            {/* Leave game button */}
            <button onClick={async() =>
             await channel.stop
            }>Leave game</button>

            
        </div>
    )
}

export default Game;