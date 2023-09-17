/**
 * Cell Component
 * 
 * Represents a single cell in the game board of the drag-and-drop word puzzle game.
 * 
 * Props:
 * - index (number): The index of this cell in the board array.
 * - letter (Letter | null): The letter object containing data to be displayed, or null if the cell is empty.
 * 
 * Usage:
 * <Cell index={0} letter={someLetterObject} />
 */

import Letter from "./Letter";
import { useDragContext } from "../../../contexts/DragContext";

interface Letter {
    letter: string;
    id: string;
    isPlacedCorrectly?: boolean;
}

interface CellProps {
    index: number;
    letter: Letter | null;
}

export default function Cell({ index, letter }: CellProps
) {
    const { handleDropOnCell } = useDragContext();
    // Render a cell with the given letter data and event handlers.
    // If `letter` is null, the cell will be rendered empty.
    return (
        <div className="cell dropzone" id={`${index}`} data-dropzone-id={`cell-${index}`} onDrop={(e) => handleDropOnCell(e, index)}>
            { letter ? <Letter 
                            key={letter.id} 
                            id={letter.id}
                            letter={letter.letter} 
                            isPlacedCorrectly={letter.isPlacedCorrectly}
                        />
                    : null }
        </div>
    );
}