import React from "react";

import "./InputSearch.scss";

export const InputSearch = ({
  value,
  setValue,
  disabled,
  label,
  type,
}) => {
  return (
    <div className="input-search">
      <div className="input-search__label">
        {label}
        {label === "id" && (
          <span className="input-search__label--asterisk">*</span>
        )}
      </div>
      <input
        className="input-search__input"
        value={value}
        onChange={setValue}
        disabled={disabled}
        required={label === 'id'}
        type={type ? "number" : "text"}
      />
    </div>
  );
};
