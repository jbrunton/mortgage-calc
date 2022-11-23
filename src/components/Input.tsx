import React from "react";

type InputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export const Input: React.FC<InputProps> = ({ id, label, value, onChange }) => {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor={id}>
        {label}
      </label>
      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-width-small"
          id={id}
          type="text"
          onChange={(e) => onChange(parseFloat(e.target.value))}
          value={value}
        />
      </div>
    </div>
  );
};
