import React, { ReactNode, type ReactElement } from "react";




import { Input } from "../ui/input";
import { Controller } from "react-hook-form";

interface Props {
  className?: string;
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
  obj?: any;
  ref?: any;
  control?: any;
  error?: string;
  name: string;
  rule?: any;
  icon?: ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type = "text",
      placeHolder,
      control,
      error,
      name,
      rule = {},
    }: Props,
    ref
  ): ReactElement => {
    return (
      <>
        <Controller
          name={name}
          rules={rule}
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <Input
                type={type}
                {...field}
                placeholder={placeHolder}
                className={`text-sm w-full  border border-solid rounded-lg bg-white !border-[#F0F0F0] focus:!border-[#F0F0F0] focus:outline-red-600 !font-inter ${className}`}
                ref={ref}
              />
            );
          }}
        />
        {error && <span className="text-red-500 text-xs ml-0.5 font-medium ">{error}</span>}
      </>
    );
  }
);
