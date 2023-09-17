/**
 * Board Component
 * 
 * Represents the game board in the drag-and-drop word puzzle game.
 * 
 * Props:
 * - n (number): The dimension of the board (n x n).
 * - boardState (Array<Letter | null>): An array representing the current state of the board.
 *
 * Usage:
 * <Board n={4} boardState={someBoardStateArray} />
 */

import Cell from "./Cell";
import { useDragContext } from "../../../contexts/DragContext";

interface Letter {
    letter: string;
    id: string;
    isPlacedCorrectly?: boolean;
}

interface BoardProps { n: number; }

/**
 * buildBoard Function
 * 
 * Generates elements for the board based on its dimension and current state.
 * 
 * @param {number} n - The dimension of the board (n x n).
 * @param {Array<Letter | null>} boardState - The current state of the board.
 * @returns {Array<JSX.Element>} An array of elements representing the board.
 */
function buildBoard(n: number, boardState: (Letter | null)[]) {
    const board = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            const index = n * i + j;
            row.push(
                    <Cell 
                        key={index}
                        index={index} 
                        letter={boardState[n * i + j]} 
                    />);
        }
        board.push(<div key={i} className="row">{row}</div>);
    }
    return board;
}

export default function Board({ n }: BoardProps) {
    // Generate the board elements using the buildBoard helper function
    const { boardState, handleDragOver } = useDragContext();
    const board = buildBoard(n, boardState);
    return (
        <div className="board" onDragOver={(e) => handleDragOver(e)}>
            { board }
        </div>
    );
}