/**
 * Game.tsx
 * 
 * This file contains the main logic for the drag-and-drop word puzzle game, QuadWords.
 * 
 * Author: Andrew
 * Last Updated: 2023-09-15
 * 
 * This file is part of QuadraWords.
 */

import { useState, useEffect } from "react";
import "./Game.css";
import Board from "./components/Board";
import LetterBank from "./components/LetterBank";
import Hint from "./components/Hint";
import Timer from "./components/Timer";
import Button from "../../components/Button";
import Modal from "./components/Modal";
import InstructionsModal from "./components/InstructionsModal";
import useTimer from "../../hooks/useTimer";
import getTime from '../../utils/timerUtils';
import useCheckPuzzleCompletion from "../../hooks/useCheckPuzzleCompletion";
import useSaveScore from "../../hooks/useSaveScore";
import { useDragContext } from '../../contexts/DragContext';

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
 * getPuzzle()
 * 
 * This function returns an array of words that make up the solution for the puzzle.
 * 
 * @returns {string[]} - An array of words.
 */
function getPuzzle(): string[] {
    return ["bad", "ago", "get"];
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
     * identifyCorrectCells(boardState: BoardState, puzzle: string[])
     * 
     * Compares the current state of the board to the solution and returns an array of 1s and 0s representing
     * whether each letter is in the correct position.
     * 
     * @param {BoardState} boardState - The current state of the board
     * @param {string[]} puzzle - The solution to the puzzle
     * @returns {number[]} - An array of 1s and 0s representing whether each letter is in the correct position
     */
function identifyCorrectCells(boardState: BoardState, puzzle: string[]): number[] {
    return boardState.map((cellLetter, index) => {
        if (cellLetter && cellLetter.letter === puzzle[index]) return 1;
        return 0;
    });
}

/**
     * colorCorrectCells(boardState: BoardState, correctCells: number[])
     * 
     * Updates the isPlacedCorrectly property of each letter.
     * 
     * @param {BoardState} boardState - The current state of the board
     * @param {string[]} puzzle - The solution to the puzzle
     * @returns {BoardState} - The board with the correct letters marked as such
     */
function colorCorrectCells(boardState: BoardState, correctCells: number[]): BoardState {
    const correctedCells = boardState.map((cellLetter, index) => {
        if (cellLetter && correctCells[index] === 1) {
            return { ...cellLetter, isPlacedCorrectly: true };
        }
        return cellLetter;
    });
    return correctedCells;
}

export default function Game() {
    const puzzle: string[] = getPuzzle();
    const letters: string[] = puzzle.join("").split("").map(letter => letter.toUpperCase());
    const [gameIsStarted, setIsGameStarted] = useState<boolean>(false);
    const [hints, setHints] = useState<number>(3);
    const isHintButtonDisabled = hints < 1;
    const [isBoardSolutionCorrect, setIsBoardSolutionCorrect] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState<boolean>(false);
    const { elapsedTime, stopTimer } = useTimer(gameIsStarted);
    const hasCompletedDailyPuzzle = useCheckPuzzleCompletion();
    // const { user, loading } = useAuth(); 
    // const [anonymousLoginComplete, setAnonymousLoginComplete] = useState(false);
    const { handleSaveScore } = useSaveScore();
    const {
        undo,
        redo,
        boardState,
        setBoardState,
        letterBankState,
        setLetterBankState
    } = useDragContext();
    const isCheckButtonDisabled = !isBoardFull();

    useEffect(() => {
        console.log('Game component mounted');
    
        return () => {
            console.log('Game component unmounted');
        };
    }, []);
    

    // useEffect to stop the timer when the board solution is correct.
    // This is reactive to changes in the isBoardSolutionCorrect state. 
    useEffect(() => {
        const handleEffect = async () => {
            if (isBoardSolutionCorrect) {
                stopTimer();
                handleSaveScore(elapsedTime);
            }
        }
        handleEffect();
    }, [isBoardSolutionCorrect]);

    // useEffect to show the instructions modal if the user has not completed 
    // today's puzzle.
    useEffect(() => {
        setIsInstructionsModalVisible(!hasCompletedDailyPuzzle);
      }, [hasCompletedDailyPuzzle]);

    /**
     * useHint()
     * 
     * Handles the click event for the "Use Hint" button.
     * Decrements the number of hints remaining, checks the solution, 
     * and updates the board state accordingly.
     */
    function useHint(): void {
        if (hints > 0) {
            setHints(hints - 1);
            const correctCells = identifyCorrectCells(boardState, letters);
            setBoardState(prevState => colorCorrectCells(prevState, correctCells));
        }
    }

    /**
     * resetGame()
     * 
     * Resets the board and letterbank to their original states.
     * The timer and hint count are not affected.
     */
    function resetGame(): void {
        setBoardState(initializeBoard(letters.length));
        setLetterBankState(populateLetterBank(letters));
    }

    /**
     * handleBoardCheck()
     * 
     * Checks if the board is correct and displays a modal with the result.
     */
    function handleBoardCheck(): void {
        const correctCells = identifyCorrectCells(boardState, letters);
        setIsBoardSolutionCorrect(correctCells.every(cell => cell === 1));
        setIsModalVisible(true);
    }

    /**
     * isBoardFull()
     * 
     * Checks if the board is full.
     * @returns {boolean} - True if the board is full, false otherwise.
     */
    function isBoardFull(): boolean {
        return boardState.every(cell => cell !== null);
    }

    const closeDirectionsModal = () => {
        setIsInstructionsModalVisible(false);
        setIsGameStarted(true);
    };

    return (
        <div className="p-1">
            { hasCompletedDailyPuzzle && <div>You've completed today's puzzle!</div> }
            { isInstructionsModalVisible && <InstructionsModal handleClose={closeDirectionsModal} /> }
            <div className="py-1">
                <div className="game-stats-container">
                    <Hint hints={hints} />
                    <Timer elapsedTime={elapsedTime} />
                </div>
                <div className="game-buttons-container gap-1 flex-wrap">
                    <Button disabled={isHintButtonDisabled} handleClick={useHint} label="Use Hint"/>
                    <Button handleClick={resetGame} label="Reset"/>
                    <Button disabled={isCheckButtonDisabled} handleClick={handleBoardCheck} label="Check"/>
                    <Button handleClick={undo.handleClick} disabled={undo.disabled} label="Undo"/>
                    <Button handleClick={redo.handleClick} disabled={redo.disabled} label="Redo"/>
                </div>
            </div>
            <Board n={puzzle.length} />
            <LetterBank letterBankState={letterBankState} />
            { isModalVisible && <Modal 
                                    isBoardSolutionCorrect={isBoardSolutionCorrect} 
                                    handleClose={() => setIsModalVisible(false)} 
                                    timeCompleted={getTime(elapsedTime)}
                                /> }
        </div>
    );
}