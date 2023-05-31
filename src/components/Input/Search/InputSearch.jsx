import React from "react";

import "./InputSearch.scss";

export const InputSearch = ({
  value,
  setValue,
  disabled,
  label,
  isRequired,
  type,
}) => {
  return (
    <div className="input-search">
      <div className="input-search__label">{label}</div>
      <input
        className="input-search__input"
        value={value}
        onChange={setValue}
        disabled={disabled}
        required={isRequired}
        type={type ? "number" : "text"}
      />
    </div>
  );
};
