"use client";

import * as React from "react";
import { cn } from "./utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

function Textarea({ className, label, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <textarea
        className={cn(
          "input-control flex min-h-[96px] w-full border px-3 py-3 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Textarea;
