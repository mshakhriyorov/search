import React, { forwardRef, memo } from "react";

import "./InputResult.scss";

export const InputResult = memo(
  forwardRef(({ result, label, blur }, ref) => {
    return (
      <div
        className="input-result"
        ref={ref}
        title={
          blur
            ? "You need to insert related prompt into search input in order to see this field"
            : `${result}`
        }
      >
        <div className="input-result__label">{label}</div>
        <div className="input-result__result">
          <input
            type={blur ? "password" : "text"}
            value={result}
            onChange={() => {}}
            disabled
            className="input-result__result-input"
          />
          {blur && <div className="input-result__blur" />}
        </div>
      </div>
    );
  })
);
