import React from "react";
import styles from "./Products.module.css";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import Product from "./Product/Product";

const Products = ({ products }) => {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("az");
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        az: "az",
        za: "za",
      };

      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) => {
        if (sortProperty === "az") {
          return a.title.localeCompare(b.title);
        } else {
          return b[sortProperty] - a[sortProperty];
        }
      });
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  return (
    <div className={styles.products}>
      <div className={styles.sorting}>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      {data.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Products);
