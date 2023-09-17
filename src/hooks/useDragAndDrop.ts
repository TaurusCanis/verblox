import { useState, useEffect } from "react";

// A constant to represent an empty cell in the board.
const EMPTY_CELL_INDEX = -1;

/**
 * Enum representing the actions that can be performed on the letter bank.
 * @enum {string}
 */
enum LetterAction {
    /** Add a letter to the letter bank. */
    Add = "add",
    
    /** Remove a letter from the letter bank. */
    Remove = "remove",
    Replace = "replace"
}

/**
 * Type definition for a Letter object.
 */
interface Letter {
    letter: string;
    id: string;
    isPlacedCorrectly?: boolean;
}

/**
 * extractLetterFromId(letterId: string)
 * 
 * Extracts the letter from a letter ID.
 * 
 * @param {string} letterId - The ID of the letter.
 * @returns {string} - The letter.
 */
function extractLetterFromId(letterId: string): string {
    console.log("letterId: ", letterId)
    return letterId.split("-")[1];
}  

/**
 * findLetterIndexOnBoard(boardState: (Letter | null)[], letterId: string)
 * 
 * Finds the index of a letter on the board based on its ID.
 * 
 * @param {(Letter | null)[]} boardState - The current state of the board.
 * @param {string} letterId - The ID of the letter to find.
 * @returns {number} - The index of the letter on the board; -1 if not found.
 */
function findLetterIndexOnBoard(boardState: (Letter | null)[], letterId: string): number {
    return boardState.findIndex(cellLetter => {
        if (cellLetter) return cellLetter.id === letterId
    });
}

/**
 * updateBoard(boardState: (Letter | null)[], letterId: string, cellIndex: number)
 * 
 * Generates a new board state to reflect the addition, removal, or change in position
 * of a letter on the board.
 * 
 * @param {(Letter | null)[]} boardState - The current state of the board.
 * @param {string} letterId - The ID of the letter to move.
 * @param {number} cellIndex - The index of the cell to move the letter to.
 * @returns {(Letter | null)[]} - The new state of the board.
 */
function updateBoard(boardState: (Letter | null)[], letterId: string, cellIndex: number): (Letter | null)[] {
    const currentBoardPosition = findLetterIndexOnBoard(boardState, letterId);
    const newBoardState = [...boardState];
    if (currentBoardPosition > EMPTY_CELL_INDEX) {
        newBoardState[currentBoardPosition] = null;
    }
    if (cellIndex > EMPTY_CELL_INDEX) {
        newBoardState[cellIndex] = { 
            letter: extractLetterFromId(letterId), 
            id: letterId,
            isPlacedCorrectly: false
        };
    }
    return newBoardState;
}

/**
 * Generates a new letter bank state by adding a new letter to it.
 *
 * @param {Letter[]} letterBankState - The current state of the letter bank.
 * @param {string} letterId - The ID of the letter to add.
 * @returns {Letter[]} - The new state of the letter bank.
 */
function addLetter(letterBankState: Letter[], letterId: string): Letter[] {
    const newLetterBankState: Letter[] = [...letterBankState];
    newLetterBankState.push({ letter: extractLetterFromId(letterId), id: letterId, isPlacedCorrectly: false });
    return newLetterBankState;
}

/**
 * Generates a new letter bank state by removing a letter from it.
 *
 * @param {Letter[]} letterBankState - The current state of the letter bank.
 * @param {string} letterId - The ID of the letter to remove.
 * @returns {Letter[]} - The new state of the letter bank.
 */
function removeLetter(letterBankState: Letter[], letterId: string): Letter[] {
    const newLetterBankState = letterBankState.filter(letter => letter.id != letterId);
    return newLetterBankState;
}

/**
 * Updates the letter bank state based on the action specified ('add' or 'remove').
 *
 * @param {Letter[]} letterBankState - The current state of the letter bank.
 * @param {string} letterId - The ID of the letter involved in the action.
 * @param {string} action - The action to perform ('add' or 'remove').
 * @returns {Letter[]} - The new state of the letter bank.
 */
function updateLetterBank(letterBankState: Letter[], letterId: string, cellIndex: number, action: LetterAction, boardState: (Letter | null)[]): Letter[] {
    // update letterBankState to remove letter
    if (action === LetterAction.Remove) return removeLetter(letterBankState, letterId);
    if (action === LetterAction.Replace) {
        const letterInCell = boardState[cellIndex];
        const updatedLetterBankState = removeLetter(letterBankState, letterId);
        return addLetter(updatedLetterBankState, letterInCell!.id)
    }
    if (!letterBankState.some(letter => letter.id === letterId)) return addLetter(letterBankState, letterId);
    return letterBankState;
}

export default function useDragAndDrop(
    boardState: (Letter | null)[],
    letterBankState: Letter[],
    setBoardState: React.Dispatch<React.SetStateAction<(Letter | null)[]>>,
    setLetterBankState: React.Dispatch<React.SetStateAction<Letter[]>>
  ) {
    const [history, setHistory] = useState([{ board: boardState, letterBank: letterBankState }]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    const [droppedLetterId, setDroppedLetterId] = useState<string>("");
    const [initialCoords, setInitialCoords] = useState({ x: 0, y: 0});
    const [draggingElement, setDraggingElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (droppedLetterId !== "") {
            setTimeout(() => {
                setDroppedLetterId("");
            }, 500); 
        }
    }, [droppedLetterId]);  

/**
 * Handles the drag start event for a letter.
 *
 * @param {React.DragEvent} event - The drag event.
 */
    const handleDragStart = (event: React.DragEvent): void => {
        if (event.dataTransfer) {
            const targetElement = event.target as HTMLElement; 
            event.dataTransfer.setData('text/plain', targetElement.id);
        }
    }   
    
    /**
     * Handles the drag over event on the board or letter bank.
    *
    * @param {React.DragEvent} event - The drag event.
    */
    const handleDragOver = (event: React.DragEvent): void => {
        event.preventDefault();
    }

    /**
     * updateStatesOnDrop(letterId: string, cellIndex: number, action: string)
     * 
     * Updates the board and letter bank states based on the action specified ('add' or 'remove').
     * 
     * @param letterId - The ID of the letter being dragged
     * @param cellIndex - The index of the cell where the letter is being dropped
     * @param action - The action to perform on the letter bank ('add' or 'remove')
     * @returns {void}
     */
    const updateStatesOnDrop = (letterId: string, cellIndex: number, action: LetterAction): void => {
        const currentBoardState = [...boardState];
        const currentLetterBankState = [...letterBankState];
        const updatedBoardState = updateBoard(currentBoardState, letterId, cellIndex);
        const updatedLetterBankState = updateLetterBank(currentLetterBankState, letterId, cellIndex, action, currentBoardState);
        setLetterBankState(updatedLetterBankState);
        setBoardState(updatedBoardState);
        setDroppedLetterId(letterId);      
       
        // Add a new entry to the history stack
        setHistory(prevHistory => [
            ...prevHistory.slice(0, currentHistoryIndex + 1),
            { board: updatedBoardState, letterBank: updatedLetterBankState }
        ]);
        setCurrentHistoryIndex(prevIndex => prevIndex + 1);
    }

    const undo = {
        disabled: currentHistoryIndex === 0,
        handleClick: () => {
            if (currentHistoryIndex > 0) {
            setCurrentHistoryIndex((prev) => prev - 1);
            setBoardState(history[currentHistoryIndex - 1].board);
            setLetterBankState(history[currentHistoryIndex - 1].letterBank);
            }
        }
    };
    
    const redo = {
        disabled: currentHistoryIndex === history.length - 1,
        handleClick: () => {
            if (currentHistoryIndex < history.length - 1) {
            setCurrentHistoryIndex((prev) => prev + 1);
            setBoardState(history[currentHistoryIndex + 1].board);
            setLetterBankState(history[currentHistoryIndex + 1].letterBank);
            }
        }
    };
    
    /**
     * Handles the drop event on the letter bank, updating both the board and letter bank states.
     *
     * @param {React.DragEvent} event - The drop event.
     */
    const handleDrop = (event: React.DragEvent): void => {
        event.preventDefault();
        const letterId: string = event.dataTransfer?.getData('text/plain');
        if (!letterId) {
            return;
        }
        updateStatesOnDrop(letterId, EMPTY_CELL_INDEX, LetterAction.Add);
    }  
    
    /**
     * Handles the drop event on a specific cell on the board, updating both the board and letter bank states.
     *
     * @param {React.DragEvent} event - The drop event.
     * @param {number} cellIndex - The index of the cell where the drop event occurred.
     */
    const handleDropOnCell = (event: React.DragEvent, cellIndex: number): void => {
        event.preventDefault();
        if (!event.dataTransfer) {
            return;
        }
    
        const letterId = event.dataTransfer.getData('text/plain');
        if (!letterId) {
            return;
        }
        if (!boardState[cellIndex]) {
            updateStatesOnDrop(letterId, cellIndex, LetterAction.Remove);
        } else if (boardState[cellIndex]!.id !== letterId) {
            updateStatesOnDrop(letterId, cellIndex, LetterAction.Replace);
        }
    }

    const handleTouchStart = (event: React.TouchEvent): void => {
        const target = event.currentTarget as HTMLElement;
    
        // Get the existing translation values
        const style = window.getComputedStyle(target);
        const matrix = new WebKitCSSMatrix(style.transform);
        
        // Set the initial coordinates considering the existing translation
        setInitialCoords({ 
            x: event.touches[0].clientX - matrix.m41, 
            y: event.touches[0].clientY - matrix.m42 
        });

        setDraggingElement(target);
    }

    const handleTouchMove = (event: React.TouchEvent): void => {
        const target = event.currentTarget as HTMLElement;
        const newCoords = { 
            x: event.touches[0].clientX - initialCoords.x, 
            y: event.touches[0].clientY - initialCoords.y 
        };
        target.style.transform = `translate(${newCoords.x}px, ${newCoords.y}px)`;
    }

    const handleTouchEnd = (event: React.TouchEvent, letterId: string): void => {
        if (!draggingElement) return;

        // Temporarily hide the dragging element to get the correct dropzone
        draggingElement.style.display = 'none';
      
        // Get the final touch point
        const touch = event.changedTouches[0];
      
        // Perform hit-testing to get the element at the touch point
        const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
        // Check if the element is one of the drop zones
        const dropzone = elementAtPoint?.closest(".dropzone");
        // Restore the display of the dragging element
        draggingElement.style.display = ''; 

      
        if (dropzone) {
            if (dropzone?.getAttribute("data-dropzone-id") === "letterbank") {
                updateStatesOnDrop(letterId, EMPTY_CELL_INDEX, LetterAction.Add);
            } else {
                const cellIndex = parseInt(dropzone.getAttribute("id") as string);
                if (!boardState[cellIndex]) {
                    updateStatesOnDrop(letterId, cellIndex, LetterAction.Remove);
                } else if (boardState[cellIndex]!.id !== letterId) {
                    updateStatesOnDrop(letterId, cellIndex, LetterAction.Replace);
                }
            }          
        }
        // Reset the transform style and clear the draggingElement state
        draggingElement.style.transform = '';
        setDraggingElement(null);
      };      


    return {
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
    }
}