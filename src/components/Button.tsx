
interface ButtonProps {
    label: string;
    handleClick: () => void;
    disabled?: boolean;
}

export default function Button({ label, handleClick, disabled=false }: ButtonProps) {
    return (
        <button disabled={disabled} className="game-btn" onClick={() => handleClick()}>
            <div>{ label }</div>
        </button>
    )
}