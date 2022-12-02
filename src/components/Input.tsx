import React from "react";
import "./Input.css";

type InputProps = {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  onBlur: () => void;
  suffix?: string;
};

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onValueChange,
  onBlur,
  suffix,
}) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};
