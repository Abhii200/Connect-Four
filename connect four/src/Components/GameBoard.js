import React, { useState, useEffect } from "react";
import './Game.css';
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, getComputerMoves } from "../helper";

const NO_CIRCLES = 16;
const NO_PLAYER = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;
const game_state_playing = 1;
const game_state_win = 2;
const game_state_draw = 3;

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(game_state_playing);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    useEffect(() => {
        if (isWinner(gameBoard, currentPlayer)) {
            setWinPlayer(currentPlayer);
            setGameState(game_state_win);
        } else if (gameBoard.every(circle => circle !== NO_PLAYER)) {
            // Check for draw when all circles are filled
            setGameState(game_state_draw);
        }
    }, [gameBoard, currentPlayer, setGameState]);

    const circleClicked = (id) => {
        if (gameState === game_state_playing && gameBoard[id] === NO_PLAYER) {
            const newBoard = [...gameBoard];
            newBoard[id] = currentPlayer;

            // Update the game board
            setGameBoard(newBoard);

            // Check for a winner after updating the game board
            if (isWinner(newBoard, currentPlayer)) {
                setWinPlayer(currentPlayer);
                setGameState(game_state_win);
            } else {
                // If there's no winner, switch to the next player
                setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
            }
        }
    };

    const startNewGame = () => {
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(game_state_playing);
        setWinPlayer(NO_PLAYER);
    };

    const suggestMove = () => {
        circleClicked(getComputerMoves(gameBoard, currentPlayer));
    };

    const renderCircles = () => {
        const circles = [];
        for (let id = 0; id < NO_CIRCLES; id++) {
            circles.push(
                <GameCircle
                    key={id}
                    id={id}
                    className={`player_${gameBoard[id]}`}
                    onCircleClicked={() => circleClicked(id)}
                />
            );
        }
        return circles;
    };

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {renderCircles()}
            </div>
           
           <Footer gameState={gameState} />
 
            <Footer onNewGameClick={startNewGame} onSuggestClick={suggestMove} />
        </>
    );
};

export default GameBoard;
