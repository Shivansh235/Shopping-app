import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams(); // get product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        console.log("Failed to fetch product");
      }
    };
  
    fetchProduct();
  }, [id]);
  

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <button className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
