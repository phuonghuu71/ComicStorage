"use client";

import { Input, Button } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";

export interface OutlineInputProps extends InputProps {
  text: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function OutlineInput({
  text,
  type,
  className,
  onChange,
}: OutlineInputProps) {
  return (
    <div
      className={`relative flex w-full gap-2 md:w-max lg:ml-auto ${className}`}
    >
      <Input
        onChange={onChange}
        crossOrigin={""}
        label={text}
        type={type}
        containerProps={{
          className: "min-w-[288px]",
        }}
      />

      <Button size="sm" className="!absolute right-1 top-1 rounded">
        {text}
      </Button>
    </div>
  );
}

export default OutlineInput;
