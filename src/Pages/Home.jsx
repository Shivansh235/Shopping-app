import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the plain CSS

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    setCategories(data);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      fetchProducts();
    } else {
      const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await res.json();
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="home-container">
      <h1>Products</h1>

      <div className="filter">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <button onClick={() => window.location.href = `/product/${product.id}`}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
