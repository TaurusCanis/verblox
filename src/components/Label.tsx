
interface LabelProps {
    htmlFor: string;
    className?: string;
    children: React.ReactNode;
  }

/**
 * Label component for form elements.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.htmlFor - The ID of the input element the label is associated with.
 * @param {React.ReactNode} props.children - The content inside the label.
 * @returns {JSX.Element} The Label component.
 */
function Label({ htmlFor, className, children }: LabelProps): JSX.Element {
  return <label className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`} htmlFor={htmlFor}>{children}</label>;
}

export default Label;
