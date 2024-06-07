import React from "react";

type Props = {
  helperText?: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  onChange: (value: Date | null) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const DatetimePicker: React.FC<Props> = ({
  required = false,
  fullWidth = false,
  helperText,
  error,
  onChange,
  ...props
}) => {
  return (
    <input
      className="border border-gray-300 rounded-md px-2 py-2 focus:border-[#556cd6] h-[40px]"
      type="datetime-local"
      id="meeting-time"
      name="meeting-time"
      min={new Date().getTime()}
      {...props}
    />
  );
};
