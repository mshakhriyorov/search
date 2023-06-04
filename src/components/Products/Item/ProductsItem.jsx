import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Xarrow from "react-xarrows";

import "./ProductsItem.scss";

import { InputResult } from "../../Input/Result";
import { NotFound } from "../../NotFound";

import { filterProducts } from "../ProductsSlice";
import { ProductsCard } from "../Card";

export const ProductsItem = () => {
  const { pathname, search } = useLocation();
  const itemRef = useRef();
  const countryCardRef = useRef();
  const countryInputRef = useRef();
  const driverCardRef = useRef();
  const driverInputRef = useRef();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    year: "",
    model: "",
    color: "",
    country: "",
    driver: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [, , vehicleId] = pathname.split("/");
  const { product } = useSelector((state) => state.products);
  const products = product.byId[vehicleId];

  const downloadAsPDF = () => {
    const input = itemRef.current;
    const images = itemRef.current.getElementsByTagName("img");

    // Wait for all images to finish loading before capturing
    const imageLoadPromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });

    Promise.all(imageLoadPromises)
      .then(() => {
        html2canvas(input)
          .then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");

            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save(`${vehicleId}.pdf`);
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
          });
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  };

  // filter vehicles according to active states
  useEffect(() => {
    dispatch(
      filterProducts({
        id: vehicleId,
        year: { text: value.year, state: true },
        model: { text: value.model, state: true },
        color: { text: value.color, state: true },
        country: { text: value.country, state: true },
        driver: { text: value.driver, state: true },
        type: { text: value.type, state: true },
      })
    );
  }, [dispatch, value, vehicleId]);

  // set values according to search params
  useEffect(() => {
    const params = new URLSearchParams(search);
    const model = params.get("model");
    const color = params.get("color");
    const year = params.get("year");
    const country = params.get("country");
    const driver = params.get("driver");
    const type = params.get("type");

    setValue({ year, model, color, country, driver, type });
  }, [search]);

  // artifical loading in order to see loader
  useEffect(() => {
    const startLoading = () => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    startLoading();
  }, []);

  return (
    <>
      {loading ? (
        <ContentLoader
          speed={2}
          width={530}
          height={700}
          viewBox="0 0 530 700"
          backgroundColor="#e3e3e3"
          foregroundColor="#d7cbcb"
        >
          <rect x="16" y="89" rx="0" ry="0" width="557" height="414" />
          <rect x="19" y="526" rx="0" ry="0" width="181" height="43" />
          <rect x="20" y="584" rx="0" ry="0" width="181" height="43" />
          <rect x="349" y="524" rx="0" ry="0" width="181" height="43" />
          <rect x="350" y="581" rx="0" ry="0" width="181" height="43" />
          <rect x="353" y="637" rx="0" ry="0" width="181" height="43" />
          <rect x="21" y="641" rx="0" ry="0" width="181" height="43" />
        </ContentLoader>
      ) : (
        <>
          {products?.length > 0 ? (
            products?.map(
              ({
                image,
                make,
                model,
                color,
                year,
                id,
                country,
                driver,
                type,
              }) =>
                id === vehicleId && (
                  <div key={id} className="products-item">
                    <div className="products-item__container" ref={itemRef}>
                      <div className="products-item__box">
                        <div className="products-item__image-box">
                          <div className="products-item__image">
                            <img src={image} alt={id} />
                          </div>
                          <div className="products-item__image-bottom">
                            <div className="products-item__title">
                              Name
                              <div className="products-item__title-id">
                                <span>{make}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="products-item__results">
                          <InputResult
                            label="Model"
                            result={model}
                            blur={!value.model}
                          />
                          <InputResult
                            label="Color"
                            result={color}
                            blur={!value.color}
                          />
                          <InputResult
                            label="Year"
                            result={year}
                            blur={!value.year}
                          />
                          <InputResult
                            label="Country"
                            result={country.name}
                            blur={!value.country}
                            ref={countryInputRef}
                          />
                          <InputResult
                            label="Type"
                            result={type}
                            blur={!value.type}
                          />
                          <InputResult
                            label="Driver"
                            result={driver.name}
                            blur={!value.driver}
                            ref={driverInputRef}
                          />
                        </div>
                      </div>

                      <div className="products-item__cards">
                        <span className="products-item__card">
                          <ProductsCard
                            value={country}
                            variant="country"
                            blur={!value.country}
                            ref={countryCardRef}
                          />
                          <Xarrow
                            start={countryInputRef}
                            end={countryCardRef}
                            color="#6941c6"
                          />
                        </span>

                        <span className="products-item__card">
                          <ProductsCard
                            value={driver}
                            variant="driver"
                            blur={!value.driver}
                            ref={driverCardRef}
                          />
                          <Xarrow
                            start={driverInputRef}
                            end={driverCardRef}
                            color="#6941c6"
                          />
                        </span>
                      </div>
                    </div>

                    <button
                      className="products-item__download"
                      onClick={downloadAsPDF}
                    >
                      Download
                    </button>
                  </div>
                )
            )
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};
