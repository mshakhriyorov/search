import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import "./Search.scss";

import { filterProducts, setProductId } from "../Products/ProductsSlice";
import { InputSearch } from "../Input/Search";

export const Search = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [value, setValue] = useState({ year: "", model: "", color: "" });
  const [switchOn, setSwithOn] = useState({
    year: false,
    model: false,
    color: false,
  });

  const clearSearch = () => {
    setId("");
    setValue({ year: "", model: "", color: "" });
    setSwithOn({
      year: false,
      model: false,
      color: false,
    });
  };

  const handleFetchProducts = () => {
    if (id) {
      dispatch(
        filterProducts({
          id,
          year: { text: value.year, state: true },
          model: { text: value.model, state: true },
          color: { text: value.color, state: true },
        })
      );
      window.open(`/product/${id}`, "_blank", "noreferrer");
      dispatch(setProductId({ id }));
    }
  };

  return (
    <div className="search">
      <div className="search__inputs">
        <div className="search__input">
          <InputSearch
            value={id}
            setValue={(e) => setId(e.target.value)}
            label="Id"
          />
        </div>
        <div className="search__input">
          <div
            className="search__switcher"
            onClick={() => setSwithOn({ ...switchOn, year: !switchOn.year })}
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
            label="Yili"
            type="number"
            disabled={!switchOn.year}
          />
        </div>
        <div className="search__input">
          <div
            className="search__switcher"
            onClick={() => setSwithOn({ ...switchOn, model: !switchOn.model })}
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
            label="Modeli"
            disabled={!switchOn.model}
          />
        </div>
        <div className="search__input">
          <div
            className="search__switcher"
            onClick={() => setSwithOn({ ...switchOn, color: !switchOn.color })}
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
            label="Rangi"
            disabled={!switchOn.color}
          />
        </div>
      </div>
      <div className="search__buttons">
        <button
          className="search__button search__button--search"
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
  );
};
