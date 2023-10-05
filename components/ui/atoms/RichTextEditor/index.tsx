"use client";

import { Typography } from "@material-tailwind/react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { FieldErrors } from "react-hook-form";
import HelperText from "../HelperText";

/* eslint-disable-next-line */
export interface RichTextEditorProps extends IAllProps {
  containerClassname?: string;
  title: string;
  name: string;
  errors: FieldErrors<any>;
}

export function RichTextEditor({
  title,
  containerClassname,
  name,
  errors,
  ...props
}: RichTextEditorProps) {
  return (
    <div className={containerClassname}>
      <Typography className="mb-2" as={"p"} variant="paragraph">
        {title}
      </Typography>
      <Editor {...props} />
      {errors[name] && (
        <HelperText isError text={errors[name]?.message?.toString()} />
      )}
    </div>
  );
}

export default RichTextEditor;
