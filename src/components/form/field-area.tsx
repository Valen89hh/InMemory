import React, { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FieldAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    classNameContainer?: string
}

const FieldArea = React.forwardRef<HTMLTextAreaElement, FieldAreaProps>(
  ({ className, classNameContainer, error, ...props }, ref) => {
    return (
      <div className={classNameContainer}>
        <textarea
          ref={ref}
          className={twMerge("px-4 py-3 w-full resize-none text-gray-dark bg-background rounded-md", className)}
          {...props}
        >

        </textarea>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

FieldArea.displayName = "FieldArea";

export default FieldArea;
