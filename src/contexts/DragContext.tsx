import { createContext, useState, ReactNode, useContext } from "react";
import useDragAndDrop from '../hooks/useDragAndDrop';

/**
 * Type definition for a BoardState object.
 */
type BoardState = (Letter | null)[];

/**
 * Type definition for a Letter object.
 */
interface Letter {
    letter: string;
    id: string;
    isPlacedCorrectly?: boolean;
}

/**
 * initializeBoard(length: number)
 * 
 * This function takes a number and returns an array of that length filled with nulls.
 * 
 * @param length 
 * @returns {BoardState} - An array of nulls.
 */
function initializeBoard(length: number): BoardState {
    return new Array(length).fill(null);
}

/**
 * populateLetterBank(letters: string[])
 * 
 * This function takes an array of letters and returns an array of Letter objects.
 * 
 * @param {string[]} letters - An array of single-character strings.
 * @returns {Letter[]} - An array of Letter objects.
 */
function populateLetterBank(letters: string[]): Letter[] {
    // make a copy of letters so the original array keeps the correct order
    const lettersCopy = [...letters];
    return lettersCopy.sort().map((letter, index) => {
        return { 
            letter: letter, 
            id: `${index}-${letter}`,
            isPlacedCorrectly: false
        }
    });
}

/**
 * getPuzzle()
 * 
 * This function returns an array of words that make up the solution for the puzzle.
 * 
 * @returns {string[]} - An array of words.
 */
function getPuzzle(): string[] {
    return ["bad", "ago", "get"];
}

interface DragContextProps {
    handleDragStart: (event: React.DragEvent<Element>) => void;
    handleDragOver: (event: React.DragEvent<Element>) => void;
    handleDrop: (event: React.DragEvent<Element>) => void;
    handleDropOnCell: (event: React.DragEvent<Element>, cellIndex: number) => void;
    handleTouchStart: (event: React.TouchEvent<Element>) => void;
    handleTouchMove: (event: React.TouchEvent<Element>) => void;
    handleTouchEnd: (event: React.TouchEvent<Element>, id: string, cellIndex?: number) => void;
    undo: {disabled: boolean; handleClick: () => void;}
    redo: {disabled: boolean; handleClick: () => void;}
    droppedLetterId: string | null;
    boardState: BoardState;
    setBoardState: React.Dispatch<React.SetStateAction<(Letter | null)[]>>;
    letterBankState: Letter[];
    setLetterBankState: React.Dispatch<React.SetStateAction<Letter[]>>;
}

export const DragContext = createContext<DragContextProps | undefined>(undefined);

export function useDragContext() {
    const context = useContext(DragContext);
    if (!context) {
      throw new Error("useDragContext must be used within a DragProvider");
    }
    return context;
  }  

export function DragProvider({ children }: { children: ReactNode }) {
    const puzzle: string[] = getPuzzle();
    const letters: string[] = puzzle.join("").split("").map(letter => letter.toUpperCase());
    const [boardState, setBoardState] = useState<BoardState>(initializeBoard(letters.length));
    const [letterBankState, setLetterBankState] = useState<Letter[]>(populateLetterBank(letters));
    const {
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDropOnCell,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        undo,
        redo,
        droppedLetterId
    } = useDragAndDrop(boardState, letterBankState, setBoardState, setLetterBankState);

  return (
    <DragContext.Provider
      value={{
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDropOnCell,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        undo,
        redo,
        droppedLetterId,
        boardState,
        setBoardState,
        letterBankState,
        setLetterBankState
      }}
    >
      {children}
    </DragContext.Provider>
  );
}
