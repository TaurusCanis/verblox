import "../Game.css";
import Button from "../../../components/Button";

interface InstructionsModalProps {
    handleClose: () => void;
}

export default function InstructionsModal({ handleClose }: InstructionsModalProps) {
    return (
        <div className="overlay">
            <div className="modal-container">
                <div id="instructions" className="instructions">
                    <h1 className="text-4xl font-extrabold dark:text-white">Verblox</h1>
                    <h2 className="text-2xl font-extrabold dark:text-white">How to Play</h2>
                    <div className="mt-4 mb-2">
                        <p>Fill the word block with the given letters so each row and 
                            column forms a valid English word.
                        </p>
                        <p>You have 3 hints available. Hints will highlight cells with
                            the correct letter in green.
                        </p>
                        <p>The game is timed. The clock begins as soon as you hit begin. 
                            Work quickly!
                        </p>
                    </div>
                </div>
                <Button label="Begin" handleClick={handleClose} />
            </div>
        </div>
    );
}