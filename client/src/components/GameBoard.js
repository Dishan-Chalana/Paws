import React, { useEffect, useState } from 'react'
import Square from './Square'
import { useChannelStateContext, useChatContext } from "stream-chat-react"
import { Patterns } from "./WinningPatterns"


function GameBoard({ result, setResult }) {
    //player icons
    const paw = "🐾";
    const rat = "🐀";

    const [gameBoard, setGameBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [player, setPlayer] = useState(paw);
    const [turn, setTurn] = useState(paw);

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    //check for a winner whenever game board changes
    useEffect(() => {
        checkWin();
        checkIfTie();
    }, [gameBoard])

    const chooseSquare = async (square) => {
        if (turn === player && gameBoard[square] === "") { //check squre alredy filled 
            setTurn(player === paw ? rat : paw); // if now correct player turn player can choose

            //send gameBoard data to other player in channel
            await channel.sendEvent({
                type: "game-move",
                data: { square, player },
            });


            setGameBoard(gameBoard.map((value, idx) => {
                if (idx === square && value === "") {
                    return player;
                }
                return value;
            }))
        }
    };

    //check for winner
    const checkWin = () => {
        Patterns.forEach((currentPattern) => {
            const firstPlayer = gameBoard[currentPattern[0]]
            if (firstPlayer == "") return;
            let foundWinningPattern = true;

            currentPattern.forEach((idx) => {
                if (gameBoard[idx] != firstPlayer) {
                    foundWinningPattern = false;
                }
            })

            //if there is a winner
            if (foundWinningPattern) {
                alert("Winner", gameBoard[currentPattern[0]]);
                setResult({ winner: gameBoard[currentPattern[0]], state: "won" });
            }

        });
        
    };

    //check for  tie
    const checkIfTie= () => {
        let boardFilled = true;
        gameBoard.forEach ((square) => {
            if (square == "") {
                boardFilled = false;
            }
        });

        if(boardFilled) {
            alert("Game Tied");
            setResult({winner: "none", state: "tie"});
        }
    }

    


    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID) {

            //set second player's mark opposite mark of first player
            const currentPlayer = event.data.player === paw ? rat : paw;
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setGameBoard(
                gameBoard.map((value, idx) => {
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