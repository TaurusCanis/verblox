import Button from '../../../components/Button';
import "../Game.css";
import { useNavigate } from "react-router-dom";

/**
 * ModalProps Interface
 * @interface
 * @property {boolean} isBoardSolutionCorrect - Indicates whether the board solution is correct.
 * @property {() => void} handleClose - Function to handle closing the modal.
 * @property {string} timeCompleted - The time it took to complete the puzzle.
 */
interface ModalProps {
    isBoardSolutionCorrect: boolean;
    handleClose: () => void;
    timeCompleted: string;
}

/**
 * Modal Component
 * @param {ModalProps} props - Properties passed to the component.
 * @returns {JSX.Element} - Rendered Modal component.
 */
export default function Modal({ isBoardSolutionCorrect, handleClose, timeCompleted }: ModalProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="overlay">
            <div className="modal-container">
                {isBoardSolutionCorrect ? 
                    <div className="modal-content">
                        <h2>Congratulations!</h2>
                        <p>{`You solved today's puzzle in ${timeCompleted}!`}</p>
                        <Button handleClick={() => navigate("/leaderboard")} label="View Leaderboard" />
                    </div>
                    :
                    <div className="modal-content">
                        <h2>Oops!</h2>
                        <p>Sorry, that's not correct.</p>
                        <Button handleClick={handleClose} label="Continue" />
                    </div>
                }
            </div>
        </div>
    );
}
