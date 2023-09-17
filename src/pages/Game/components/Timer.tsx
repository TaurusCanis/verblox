import getTime from '../../../utils/timerUtils';

/**
 * TimerProps Interface
 * @interface
 * @property {number} elapsedTime - The elapsed time in milliseconds.
 */
interface TimerProps {
    elapsedTime: number;
}

/**
 * Timer Component
 * @param {TimerProps} props - Properties passed to the component
 * @returns {JSX.Element} - Rendered Timer component
 */
export default function Timer({ elapsedTime }: TimerProps): JSX.Element {
    return (
        // Display the timer
        <div className="timer" id="game-clock">
            <time>{getTime(elapsedTime)}</time>
        </div>
    );
}

