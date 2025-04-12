import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    setShowPopup(true);
    setCartItems([]);
    localStorage.removeItem('cart');

    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }

  totalPrice = totalPrice.toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {cartItems.length > 0 && (
        <div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="item-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />

                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="checkout">
            <h3>Total: ${totalPrice}</h3>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default Cart;
