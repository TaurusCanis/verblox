
interface LabelProps {
    htmlFor: string;
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
function Label({ htmlFor, children }: LabelProps): JSX.Element {
  return <label htmlFor={htmlFor}>{children}</label>;
}

export default Label;
