import React from "react";

function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img className="small" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <h3>${product.price}</h3>
      <h3>{product.description}</h3>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}

export default Product;
