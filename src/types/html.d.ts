
// Extend the HTMLInputElement interface to include non-standard attributes
interface HTMLInputElement {
  webkitdirectory?: string;
  directory?: string;
}

// Extend InputHTMLAttributes to include our non-standard attributes
interface InputHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  webkitdirectory?: string;
  directory?: string;
}
