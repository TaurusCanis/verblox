import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * Custom hook to handle form state and submission.
 *
 * @template FormValues - The shape of the state object.
 * @param {FormValues} initialValues - The initial state values of the form.
 * @param {(values: FormValues) => void} onSubmit - The function to execute on form submission.
 * @returns {{
 *   values: FormValues,
 *   handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
 *   handleSubmit: (e: FormEvent<HTMLFormElement>) => void
 * }} The form values and functions to handle changes and submission.
 */
export default function useForm<FormValues>(
  initialValues: FormValues,
  onSubmit: (values: FormValues) => void
) {
  const [values, setValues] = useState<FormValues>(initialValues);

  /**
   * Handles changes to form input values.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    } as FormValues);
  };

  /**
   * Handles form submission.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
