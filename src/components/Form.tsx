import { FormEvent } from 'react';

interface FormProps {
    id: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className: string;
    children: React.ReactNode;
  }
  
/**
 * Form component for form elements.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The ID of the form.
 * @param {(e: FormEvent<HTMLFormElement>) => void} props.onSubmit - The function to call when the form is submitted.
 * @param {React.ReactNode} props.children - The content inside the form.
 * @returns {JSX.Element} The Form component.
 */
function Form({ id, onSubmit, className, children }: FormProps): JSX.Element {
  return <form id={id} className={className} onSubmit={onSubmit}>{children}</form>;
}

export default Form;
