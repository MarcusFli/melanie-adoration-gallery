
// Extend the HTMLInputElement interface to include non-standard attributes
interface HTMLInputElement {
  webkitdirectory?: string | boolean;
  directory?: string | boolean;
}

// Extend React's InputHTMLAttributes to include our non-standard attributes
declare namespace React {
  interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
    webkitdirectory?: string | boolean;
    directory?: string | boolean;
  }
}
