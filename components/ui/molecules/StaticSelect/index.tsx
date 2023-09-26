"use client";

import { Option, Select } from "@material-tailwind/react";
import {
  ControllerRenderProps,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

/* eslint-disable-next-line */
export interface StaticSelectProps {
  list: any[];
  containerClassname?: string;
  onChange: (event: any) => void;
  defaultValue?: string;
}

export function StaticSelect({
  list,
  containerClassname,
  onChange,
  defaultValue,
}: StaticSelectProps) {
  return (
    <div className={`${containerClassname}`}>
      <Select
        variant={"static"}
        label={"Status"}
        value={defaultValue || list[0]}
        onChange={onChange}
      >
        {list.map((item, i) => (
          <Option key={i} value={item} className="mb-2 last:mb-0">
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default StaticSelect;
