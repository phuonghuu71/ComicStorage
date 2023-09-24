import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

export interface HelperTextProps {
  text?: string | "There is an error occurred. Please try again.";
  isError?: boolean;
}

export default function HelperText({ text, isError }: HelperTextProps) {
  return (
    <Typography
      variant="small"
      color={isError ? "red" : "gray"}
      className="mt-2 flex items-center gap-1 font-normal"
    >
      <ExclamationCircleIcon className="w-5 h-5" />
      {text}
    </Typography>
  );
}
