"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Input, Tooltip, Typography } from "@material-tailwind/react";

import { InputProps } from "@material-tailwind/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import HelperText from "../../atoms/HelperText";

export interface StaticInputProps extends InputProps {
  name: string;
  containerClassName?: string;
  showTooltip?: boolean;
  tooltipContent?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isRequired?: boolean;
}

export function StaticInput({
  label,
  name,
  placeholder,
  tooltipContent,
  showTooltip,
  containerClassName,
  register,
  errors,
  isRequired,
  disabled,
}: StaticInputProps) {
  return (
    <div className={containerClassName}>
      <Input
        {...register(name, {
          required: isRequired || false,
        })}
        disabled={disabled}
        crossOrigin={""}
        label={label}
        placeholder={placeholder}
        variant="static"
        icon={
          showTooltip && (
            <Tooltip
              placement="bottom-end"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content={
                <div className="w-fit">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                  >
                    {tooltipContent}
                  </Typography>
                </div>
              }
            >
              <ExclamationCircleIcon className="w-5 h-5" />
            </Tooltip>
          )
        }
      />
      {errors[name] && (
        <HelperText isError text={errors[name]?.message?.toString()} />
      )}
    </div>
  );
}

export default StaticInput;
