import React from "react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.상품명}</h2>
        <p>위치: {product.위치명}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ProductModal;
