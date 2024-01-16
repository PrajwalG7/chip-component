import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBackspacePress: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, onBackspacePress, onFocus }, ref) => (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onBackspacePress}
      placeholder="Add new user"
      className="input-box p-2 border-none outline-none"
      onFocus={onFocus}
    />
  )
);

export default InputField;
