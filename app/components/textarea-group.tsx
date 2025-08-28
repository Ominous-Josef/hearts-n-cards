"use client";

import type { ComponentProps, FC, ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface TextareaGroupProps extends ComponentProps<"textarea"> {
  label?: ReactNode;
  errorMsg?: FieldError;
}
export const TextareaGroup: FC<TextareaGroupProps> = ({
  label,
  errorMsg,
  name,
  ...textareaProps
}) => {
  return (
    <div className="relative space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        {...textareaProps}
        className={errorMsg && "border-destructive"}
      />
      {errorMsg && (
        <span className="text-xs text-destructive">{errorMsg.message}</span>
      )}
    </div>
  );
};
