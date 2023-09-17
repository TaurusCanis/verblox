
interface HintProps {
    hints: number;
}

/**
 * Hint Component
 * 
 * Displays the number of hints remaining.
 * 
 * @param {number} hints - The current number of hints remaining.
 */
export default function Hint({ hints }: HintProps) {
    return (
        <div className="hint">
            <div>Hints Remaining: { hints }</div>
        </div>
    );
}