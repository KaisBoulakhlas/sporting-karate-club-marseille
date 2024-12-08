import React, { forwardRef } from "react";

interface CheckboxProps {
  label?: string;
  className?: string;
  id: string;
  errorMessage?: string;
}

const CheckBoxComponent = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", id, errorMessage, ...props }, ref) => {
    return (
      <div className="rpgd-wrapper">
        <div className={`checkbox-wrapper ${className}`}>
          <label className="toggler-wrapper">
            <input type="checkbox" id={id} ref={ref} {...props} />
            <div className="toggler-slider">
              <div className="toggler-knob"></div>
            </div>
          </label>

          {label && <label htmlFor={id}>{label}</label>}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
);

CheckBoxComponent.displayName = "CheckBoxComponent";

export default CheckBoxComponent;
