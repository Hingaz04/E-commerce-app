import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that facilitates buying
          and selling of products or services over the internet services as a
          virtual market place where businesses and individuals showcase their
          products, interact with customers and conduct transactons without the
          need of a physical presence. E-commerce websites have gained immence
          popularity due to their convinience accessibility and the global reach
          they offer.
        </p>

        <p>
          E-commerce websites typically display products or services and
          detailed descriptions, images, prices and any available
          variables(e.g., sizez, colors). Each product ussually has its own
          dedication with relevant information
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
