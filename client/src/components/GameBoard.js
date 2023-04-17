import React, { useState } from 'react'
import Square from './Square'
import {useChannelStateContext, useChatContext} from "stream-chat-react"


function GameBoard() {
    const [gameBoard, setGameBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");
    const {channel} = useChannelStateContext();
    const {client} = useChatContext();

    const chooseSquare = async (square) => {
        if (turn === player && gameBoard[square] === "") { //check squre alredy filled 
            setTurn(player === "X" ? "0" : "X"); // if now correct player turn player can choose

//send gameBoard data to other player in channel
            await channel.sendEvent({
                type: "game-move",
                data: {square, player},
            });


            setGameBoard(gameBoard.map((value, idx) => {
                if (idx === square && value === "") {
                    return player;
                }
                return value;
            }))
        }
    };

    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID) {
            
            //set second player's mark opposite mark of first player
            const currentPlayer = event.data.player === "X" ? "0" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setGameBoard(
                gameBoard.map((value,idx) => {
                    if (idx === event.data.square && value === "") {
                        return event.data.player;
                    }
                    return value;
                })
             
            );
        }
    });


    return (
        //3x3 board
        <div className='gameBoard'>
            <div className='row'>
                <Square chooseSquare={() => {
                    chooseSquare(0)
                }} value={gameBoard[0]} />

                <Square chooseSquare={() => {
                    chooseSquare(1)
                }} value={gameBoard[1]} />

                <Square chooseSquare={() => {
                    chooseSquare(2)
                }} value={gameBoard[2]} />
            </div>

            <div className='row'>
                <Square chooseSquare={() => {
                    chooseSquare(3)
                }} value={gameBoard[3]} />

                <Square chooseSquare={() => {
                    chooseSquare(4)
                }} value={gameBoard[4]} />

                <Square chooseSquare={() => {
                    chooseSquare(5)
                }} value={gameBoard[5]} />
            </div>

            <div className='row'>
                <Square chooseSquare={() => {
                    chooseSquare(6)
                }} value={gameBoard[6]} />

                <Square chooseSquare={() => {
                    chooseSquare(7)
                }} value={gameBoard[7]} />

                <Square chooseSquare={() => {
                    chooseSquare(8)
                }} value={gameBoard[8]} />
            </div>
        </div>

    )
}

export default GameBoard