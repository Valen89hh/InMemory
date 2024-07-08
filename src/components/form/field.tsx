import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    classNameContainer?: string
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className,classNameContainer, error, ...props }, ref) => {
    return (
      <div className={classNameContainer}>
        <input
          ref={ref}
          className={twMerge("px-4 py-3 w-full text-black bg-background rounded-md", className)}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Field.displayName = "Field";

export default Field;
