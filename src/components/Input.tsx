import { ChangeEvent } from 'react';

interface InputProps {
    type: string;
    id: string;
    className?: string;
    name: string;
    required: boolean;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  }

/**
 * Input component for form elements.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of the input element.
 * @param {string} props.id - The ID of the input element.
 * @param {string} props.name - The name attribute of the input element.
 * @param {boolean} props.required - Whether the field is required.
 * @param {string} props.value - The value of the input element.
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} props.onChange - The function to call when the input changes.
 * @returns {JSX.Element} The Input component.
 */
function Input({ type, id, className, name, required, value, onChange }: InputProps): JSX.Element {
  return <input type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name={name} required={required} value={value} onChange={onChange} />;
}

export default Input;
