"use client";

import HelperText from "../HelperText";

import { Input, InputProps } from "@material-tailwind/react";
import { FieldErrors } from "react-hook-form";

/* eslint-disable-next-line */
export interface UploadInputProps extends InputProps {
  containerClassname?: string;
  name: string;
  errors: FieldErrors<any>;
}

export function UploadInput({
  containerClassname,
  label,
  placeholder,
  onChange,
  name,
  errors,
}: UploadInputProps) {
  return (
    <div className={containerClassname}>
      <Input
        crossOrigin={""}
        label={label}
        variant="static"
        placeholder={placeholder}
        className="!bg-transparent !border-b border-black"
        type="file"
        onChange={onChange}
      />

      {errors[name] && (
        <HelperText isError text={errors[name]?.message?.toString()} />
      )}
    </div>
  );
}

export default UploadInput;
