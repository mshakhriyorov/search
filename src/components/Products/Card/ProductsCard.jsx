import React from "react";
import { InputResult } from "../../Input/Result";

export const ProductsCard = ({ value }) => {
  const { name, region, population, capital, timezones } = value;

  return (
    <div>
      <div className="products-card__title">Info about country</div>

      <div className="products-card__results">
        <InputResult label="Country name" result={name} />
        <InputResult label="Capital" result={capital} />
        <InputResult label="Timezone" result={timezones[0]} />
        <InputResult label="Region" result={region} />
        <InputResult label="Population" result={population} />
      </div>
    </div>
  );
};
