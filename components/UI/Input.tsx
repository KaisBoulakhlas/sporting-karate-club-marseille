import React, { forwardRef } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  defaultValue?: string;
  id?: string;
  isTextarea?: boolean;
  errorMessage?: string;
  clLabel?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      type = "text",
      placeholder = "",
      className = "",
      clLabel = "",
      name,
      defaultValue,
      id,
      isTextarea = false,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label className={clLabel} htmlFor={id}>
            {label}
          </label>
        )}
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            className="textarea"
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="input"
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
