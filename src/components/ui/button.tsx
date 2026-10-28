"use client";

import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-medium text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2":
            variant === "default" && size === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2":
            variant === "destructive" && size === "default",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2":
            variant === "outline" && size === "default",
          "hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2":
            variant === "ghost" && size === "default",
          "text-primary underline-offset-4 hover:underline h-10 px-4 py-2":
            variant === "link" && size === "default",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}

export default Button;
