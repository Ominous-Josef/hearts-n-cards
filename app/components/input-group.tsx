"use client";

import type { ComponentProps, FC, ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputGroupProps extends ComponentProps<"input"> {
  label?: ReactNode;
  errorMsg?: FieldError;
}
export const InputGroup: FC<InputGroupProps> = ({
  label,
  errorMsg,
  name,
  ...inputProps
}) => {
  return (
    <div className="relative space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        {...inputProps}
        className={errorMsg && "border-destructive"}
      />
      {errorMsg && (
        <span className="text-xs text-destructive">{errorMsg.message}</span>
      )}
    </div>
  );
};
