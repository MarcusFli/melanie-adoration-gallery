
// Extend the HTMLInputElement interface to include non-standard attributes
interface HTMLInputElement {
  webkitdirectory?: string | boolean;
  directory?: string | boolean;
}

// Extend InputHTMLAttributes to include our non-standard attributes
interface InputHTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
  webkitdirectory?: string | boolean;
  directory?: string | boolean;
}
