"use client";

import * as React from "react";
import { cn } from "./utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ className, type, label, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="field-label">{label}</label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          "input-control flex h-11 w-full border px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Input;
