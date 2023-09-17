import { ChangeEvent } from 'react';

interface InputProps {
    type: string;
    id: string;
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
function Input({ type, id, name, required, value, onChange }: InputProps): JSX.Element {
  return <input type={type} id={id} name={name} required={required} value={value} onChange={onChange} />;
}

export default Input;
