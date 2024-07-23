import React from "react";
import { game_state_draw, game_state_playing, game_state_win } from "./Constraints";

const Header = ({ gameState, currentPlayer, winPlayer }) => {
    const renderLabel = () => {
        switch (gameState) {
            case 0:
                return "Game is idle";
            case game_state_playing:
                return `Player ${currentPlayer}'s turn`;
            case game_state_win:
                return `Player ${winPlayer} wins`;
            case game_state_draw:
                return "Game is a draw";
            default:
                return "Game is idle";
        }
    };

    return (
        <div className="panel">
            <div className="header">
                <div className="header-text">{renderLabel()}</div>
            </div>
        </div>
    );
};

export default Header;
