import React, { useState } from "react";
import cn from "classnames";

import "./Search.scss";

import { InputSearch } from "../Input/Search";

import { createSearchPath } from "../../utils/createSearchPath";

const INITIAL_SWITCHERS = {
  year: false,
  model: false,
  color: false,
  country: false,
  driver: false,
  type: false,
};

const INITIAL_VALUES = {
  year: "",
  model: "",
  color: "",
  country: "",
  driver: "",
  type: "",
};

export const Search = () => {
  const [id, setId] = useState("");
  const [value, setValue] = useState(INITIAL_VALUES);
  const [switchOn, setSwithOn] = useState(INITIAL_SWITCHERS);
  const [isValidation, setIsValidation] = useState(false);
  const searchPath = createSearchPath(value);

  const clearSearch = () => {
    setId("");
    setValue(INITIAL_VALUES);
    setSwithOn(INITIAL_SWITCHERS);
    setIsValidation(false);
  };

  const handleFetchProducts = () => {
    if (id) {
      if (searchPath) {
        window.open(`/product/${id}?${searchPath}`, "_blank", "noreferrer");
      } else {
        window.open(`/product/${id}`, "_blank", "noreferrer");
      }
      setIsValidation(false);
    } else {
      setIsValidation(true);
    }
  };

  return (
    <div className="search">
      <div className="search__top">
        <div className="search__inputs">
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, year: !switchOn.year });
                setValue({ ...value, year: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--year": switchOn.year,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.year ? value.year : ""}
              setValue={(e) => setValue({ ...value, year: e.target.value })}
              label="Year"
              type="number"
              disabled={!switchOn.year}
            />
          </div>
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, model: !switchOn.model });
                setValue({ ...value, model: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--model": switchOn.model,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.model ? value.model : ""}
              setValue={(e) => setValue({ ...value, model: e.target.value })}
              label="Model"
              disabled={!switchOn.model}
            />
          </div>
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, color: !switchOn.color });
                setValue({ ...value, color: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--color": switchOn.color,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.color ? value.color : ""}
              setValue={(e) => setValue({ ...value, color: e.target.value })}
              label="Color"
              disabled={!switchOn.color}
            />
          </div>
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, country: !switchOn.country });
                setValue({ ...value, type: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--country": switchOn.country,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.country ? value.country : ""}
              setValue={(e) => setValue({ ...value, country: e.target.value })}
              label="Country"
              disabled={!switchOn.country}
            />
          </div>
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, driver: !switchOn.driver });
                setValue({ ...value, driver: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--driver": switchOn.driver,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.driver ? value.driver : ""}
              setValue={(e) => setValue({ ...value, driver: e.target.value })}
              label="Driver"
              disabled={!switchOn.driver}
            />
          </div>
          <div className="search__input">
            <div
              className="search__switcher"
              onClick={() => {
                setSwithOn({ ...switchOn, type: !switchOn.type });
                setValue({ ...value, type: "" });
              }}
              aria-hidden="true"
            >
              <div
                className={cn("search__switcher-ellipse", {
                  "search__switcher-ellipse--type": switchOn.type,
                })}
              />
            </div>
            <InputSearch
              value={switchOn.type ? value.type : ""}
              setValue={(e) => setValue({ ...value, type: e.target.value })}
              label="Type"
              disabled={!switchOn.type}
            />
          </div>
        </div>
        <div className="search__input--id">
          <InputSearch
            value={id}
            setValue={(e) => setId(e.target.value)}
            label="id"
          />
          {isValidation && (
            <span className="search__input-validation">
              Please, enter id. It's required
            </span>
          )}
        </div>
        <div className="search__buttons">
          <button
            className={cn("search__button search__button--search", {
              "search__button search__button--disabled": !id,
            })}
            onClick={handleFetchProducts}
          >
            Search
          </button>
          <button
            type="reset"
            className="search__button search__button--reset"
            onClick={clearSearch}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
