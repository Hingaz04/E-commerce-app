import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;

  // Check if product exists and has the category property
  if (!product || !product.category) {
    return null; // Render nothing if product or category is undefined
  }

  return (
    <div className="breadcrum">
      HOME
      <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />{" "}
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
