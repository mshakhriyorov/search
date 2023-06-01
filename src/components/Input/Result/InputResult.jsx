import React from "react";

import "./InputResult.scss";

export const InputResult = ({ result, label, blur }) => {
  return (
    <div className="input-result">
      <div className="input-result__label">{label}</div>
      <div className="input-result__result">
        {result}
        {blur && <div className="input-result__blur" />}
      </div>
    </div>
  );
};
