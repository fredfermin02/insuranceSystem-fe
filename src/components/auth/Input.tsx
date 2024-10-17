import { type ReactNode } from 'react';

interface Props {
  className?: string;
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
  properties: any;
  icon?: ReactNode;
}

export const Input = ({
  className,
  type = 'text',
  placeHolder,
  defaultValue,
  properties,
  icon,
}: Props): ReactNode => {
  return (
    <input
      className={`text-sm w-full px-4 py-2 border border-solid rounded-lg border-gray-300 ${className}`}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeHolder}
      icon={icon}
      {...properties}
    />
  );
};
