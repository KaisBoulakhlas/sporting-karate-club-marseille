import React from "react";

interface FormWrapperProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  children,
  className,
}) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
);

export default FormWrapper;
