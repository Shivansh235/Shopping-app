import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProductDetailPage from './Pages/ProductDetailPage';
import Cart from './Pages/Cart';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
