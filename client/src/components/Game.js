import React, { useState } from 'react'
import GameBoard from './GameBoard';
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";


function Game({ channel, setChannel }) {
    const [playesJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2)

    const [result, setResult] = useState({ winner: "none", state: "none" }); //no winner at beginning

    channel.on("user.watching.start", (event) => { //one user start, other user will go to game automatically
        setPlayersJoined(event.watcher_count === 2);
    })

    if (!playesJoined) {    //if all players are not connected
        return <div className='waiting-msg'> Waiting for other player....</div>;
    }
    return (
      <div>
        <h1 className='main-title' >🐾 PAWS 🐭</h1>
        <div className='gameContainer'>
            <GameBoard result={result} setResult={setResult} />
            {/* Player Chat */}
            <Window>
                {/* chat list features */}
                <MessageList
                    disableDateSeparator
                    closeReactionSelectorOnClick
                    messageActions={["react"]}
                    hideDeletedMessages

                />
                <MessageInput noFiles />
            </Window>
        </div>

        {/* Leave game button */}
        <button className='leave-btn'
                onClick={async () => {
                    await channel.stopWatching();
                    setChannel(null);
                }}
            >
                {" "}
                Leave Game
        </button>

            {/* display player results */}
            {/* {result.state === "won" && <div> {result.winner} <h1>Won The Game</h1> </div>}
            {result.state === "tie" && <div> {result.winner} <h1>Game Tieds</h1> </div>} */}
      </div>
        
    )
}

export default Game;