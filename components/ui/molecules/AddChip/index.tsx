"use client";

import {
  Chip,
  Input,
  InputProps,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FieldErrors } from "react-hook-form";
import { useChipProps } from "@hooks/useChip";
import { useInputProps } from "@hooks/useInput";
import HelperText from "../../atoms/HelperText";

// eslint-disable-next-line
export interface AddChipProps extends InputProps, useChipProps, useInputProps {
  containerClassname?: string;
  showTooltip?: boolean;
  tooltipContent?: string;
  rootList: string[];
  name: string;
  value: string[];
  onChange: (event: any) => void;
  errors: FieldErrors<any>;
}

export function AddChip({
  containerClassname,
  showTooltip,
  tooltipContent,
  label,
  placeholder,
  text,
  rootList,
  openPopover,
  addItemToCurrentlist,
  deleteItemFromCurrentList,
  onChangeTextHandler,
  name,
  value,
  onChange,
  errors,
}: AddChipProps) {
  const findText = rootList.filter((dataI: string) =>
    dataI.trim().toLowerCase().replace(/\s/g, "").includes(text)
  );

  return (
    <div className={containerClassname}>
      <div className="flex flex-col gap-y-2">
        <Input
          crossOrigin={""}
          variant="static"
          label={label}
          placeholder={placeholder}
          value={text}
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
          onChange={(e) => {
            onChangeTextHandler(e);
          }}
        />

        {errors[name] && (
          <HelperText isError text={errors[name]?.message?.toString()} />
        )}

        <div className="flex gap-x-2">
          {value.map((item, i) => (
            <Chip
              onClose={() => {
                deleteItemFromCurrentList(item);
                onChange(value.filter((itemI: string) => itemI !== item));
              }}
              value={item}
              key={i}
              className="w-fit"
            />
          ))}
        </div>
      </div>

      <div
        className={`transition-all absolute z-10 top-12 bg-white max-h-60 overflow-y-scroll w-60 p-3 rounded-md shadow-md ${
          openPopover ? "scale-100" : "-scale-0"
        }`}
      >
        <Typography as={"p"} className="px-1 mb-2">
          {label} List
        </Typography>
        {findText.length > 0 ? (
          <>
            {findText.map((dataI, i) => (
              <div
                className="w-full px-2 py-1 border-2 rounded-md border-blue-gray-50 hover:text-white hover:bg-purple-500 transition-colors mb-2 last:mb-0 cursor-pointer"
                key={i}
                onClick={(e) => {
                  addItemToCurrentlist(e, dataI);
                  onChange([...value, dataI]);
                }}
              >
                <Typography as={"p"}>{dataI}</Typography>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full p-4 text-center">
            <Typography as={"p"}>Nothing</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddChip;
