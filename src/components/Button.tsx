
interface ButtonProps {
    label: string;
    handleClick: () => void;
    className?: string;
    disabled?: boolean;
}

export default function Button({ label, handleClick, className, disabled=false }: ButtonProps) {
    return (
        <button disabled={disabled} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => handleClick()}>
            { label }
        </button>
    )
}