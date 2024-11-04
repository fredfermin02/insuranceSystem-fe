import { type ReactNode } from "react";

interface Props {
  className?: string;
  baseClassName?: string;
  text: string;
  required?: boolean;
}

export const Label = ({
  className,
  baseClassName,
  text,
  required = false,
}: Props): ReactNode => {
  return (
    <div className={baseClassName}>
      <label className={`cursor-pointer text-primar ${className}`}>
        {text}
        {required && <span className="text-red-900"> *</span>}
      </label>
    </div>
  );
};

export default Label;
