import React from "react";
import "./Input.css";

type InputProps = {
  id: string;
  label: string;
  defaultValue: number;
  onValueChange: (value: number) => void;
  suffix?: string;
};

export const Input: React.FC<InputProps> = ({
  id,
  label,
  defaultValue,
  onValueChange,
  suffix,
}) => {
  const onBlur: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onValueChange(value);
    }
  };
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor={id}>
        {label}
      </label>
      <div className="uk-form-controls">
        <div className="uk-inline">
          {suffix && (
            <span className="uk-form-icon uk-form-icon-flip suffix">
              {suffix}
            </span>
          )}
          <input
            className="uk-input uk-form-width-medium"
            id={id}
            type="text"
            onBlur={onBlur}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </div>
  );
};
