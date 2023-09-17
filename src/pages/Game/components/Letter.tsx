/**
 * Letter Component
 * 
 * Represents a single letter in the drag-and-drop word puzzle game. 
 * This letter can be draggable and its appearance changes based on whether 
 * it's placed correctly or not.
 * 
 * Props:
 * - letter (string): The actual letter character.
 * - id (string): The unique identifier for the letter.
 * - isPlacedCorrectly (Boolean): Optional prop that indicates if the letter is placed correctly on the board.
 * 
 * Usage:
 * <Letter letter="A" id="letter-A" isPlacedCorrectly={false} />
 */

import { useDragContext } from "../../../contexts/DragContext";

// A constant to represent an empty cell in the board.
// const EMPTY_CELL = -1;

interface LetterProps {
    letter: string;
    id: string,
    cellIndex?: number;
    isPlacedCorrectly?: boolean;
}

export default function Letter({ letter, id, isPlacedCorrectly = false }: LetterProps) {
    /**
     * The className is dynamically generated based on whether the letter is placed correctly or not.
     * The `draggable` attribute is set to true to enable drag-and-drop functionality.
     * When dragged, the `handleDragStart` method is called.
     */

    const { droppedLetterId, handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd } = useDragContext();
    return (
        <span 
            key={id}
            id={id} 
            className={`letter no-touch-action ${id === droppedLetterId ? 'pop' : ''} ${isPlacedCorrectly ? 'correct' : 'incorrect' }`} 
            draggable="true" 
            onDragStart={(e) => handleDragStart(e/*, id, EMPTY_CELL*/)}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e, id)}
        >
            {letter}
        </span>
    );
}