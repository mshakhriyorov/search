import React, { memo, forwardRef } from "react";

import { InputResult } from "../../Input/Result";

import "./ProductsCard.scss";

export const ProductsCard = memo(
  forwardRef(({ variant, value, blur }, ref) => {
    const {
      name,
      region,
      population,
      capital,
      timezones,
      email,
      website,
      address,
      company,
    } = value;

    return (
      <div ref={ref}>
        <div className="products-card__title">
          Information about{" "}
          <span className="products-card__title--variant">{variant}</span> of
          the car
        </div>

        <div className="products-card__results">
          {name && (
            <InputResult label={`${variant} name`} result={name} blur={blur} />
          )}
          {capital && (
            <InputResult label="Capital" result={capital[0]} blur={blur} />
          )}
          {timezones && (
            <InputResult label="Timezone" result={timezones[0]} blur={blur} />
          )}
          {region && <InputResult label="Region" result={region} blur={blur} />}
          {population && (
            <InputResult label="Population" result={population} blur={blur} />
          )}
          {email && <InputResult label="Email" result={email} blur={blur} />}
          {website && (
            <InputResult label="Website" result={website} blur={blur} />
          )}
          {address && (
            <InputResult label="City" result={address.city} blur={blur} />
          )}
          {company && (
            <InputResult label="Company" result={company.name} blur={blur} />
          )}
        </div>
      </div>
    );
  })
);
