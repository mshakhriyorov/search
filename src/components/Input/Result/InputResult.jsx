import React from "react";

import "./InputResult.scss";

export const InputResult = ({ result, label }) => {
  return (
    <div className="input-result">
      <div className="input-result__label">Label</div>
      <div className="input-result__result">Result</div>
    </div>
  );
};
