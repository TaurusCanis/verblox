import Letter from "./Letter";
import { useDragContext } from "../../../contexts/DragContext";

interface Letter {
    letter: string;
    id: string;
    isPlacedCorrectly?: boolean;
  }

interface LetterBankProps {
    letterBankState: Letter[];
}

/**
 * buildLetterBank
 * 
 * Maps an array of Letter objects to an array of Letter components.
 * 
 * @param {Letter[]} letters - Array of Letter objects.
 * @returns {JSX.Element[]} - An array of Letter components.
 */
function buildLetterBank(letters: Letter[]) {
    return letters.map(letter => {
        return (
            <Letter 
                key={letter.id} 
                id={letter.id}
                letter={letter.letter} 
            />
        );
    });
}

/**
 * LetterBank Component
 * 
 * Displays a list of draggable letters.
 * 
 * @param {Letter[]} letterBankState - The current state of the letter bank.
 */
export default function LetterBank({ letterBankState }: LetterBankProps) {
    const letterBank = buildLetterBank(letterBankState);
    const { handleDragOver, handleDrop } = useDragContext();
    return (
        <div className="letter-bank dropzone" data-dropzone-id="letterbank" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
            { letterBank }
        </div>
    );
}
