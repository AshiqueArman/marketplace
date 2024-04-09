import React, { useState } from 'react';
import './BuyItemPage.css';

function BuyItemPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);

  const items = [
    { id: 1, name: 'Electric Kettle', price: 25 },
    { id: 2, name: 'Toaster', price: 30 },
    { id: 3, name: 'Coffee Maker', price: 45 },
    { id: 4, name: 'Blender', price: 40 },
    { id: 5, name: 'Microwave Oven', price: 100 },
    { id: 6, name: 'Food Processor', price: 50 },
    { id: 7, name: 'Electric Grill', price: 60 },
    { id: 8, name: 'Rice Cooker', price: 35 },
    { id: 9, name: 'Waffle Maker', price: 40 },
    { id: 10, name: 'Juicer', price: 45 },
    { id: 11, name: 'Electric Mixer', price: 55 },
    { id: 12, name: 'Electric Can Opener', price: 20 },
    { id: 13, name: 'Electric Pressure Cooker', price: 75 },
    { id: 14, name: 'Electric Griddle', price: 50 },
    { id: 15, name: 'Electric Deep Fryer', price: 70 },
    { id: 16, name: 'Electric Ice Cream Maker', price: 80 },
    { id: 17, name: 'Electric Skillet', price: 55 },
    { id: 18, name: 'Electric Citrus Juicer', price: 25 },
    { id: 19, name: 'Electric Egg Cooker', price: 30 },
    { id: 20, name: 'Electric Milk Frother', price: 35 }
  ];

  const handleCheckboxChange = (item) => {
    const isChecked = cartItems.some(cartItem => cartItem.id === item.id);
    if (isChecked) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const handleBuy = () => {
    setIsPurchased(true);
    setCartItems([]);
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:5173";
  };

  const handlePasswordChange = () => {
    window.location.href = "http://localhost:5173/changePWD";
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <div className="button-container">
        <button className="change-password-button" onClick={handlePasswordChange}>Change Password</button>
        <div className="logout-button" onClick={handleLogout}>Logout</div>
      </div>
      <h1>Buy Items</h1>
      <div className="item-grid">
        {items.map(item => (
          <div key={item.id} className="item">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={cartItems.some(cartItem => cartItem.id === item.id)}
              onChange={() => handleCheckboxChange(item)}
            />
            <label htmlFor={`item-${item.id}`}>{item.name} - ${item.price}</label>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div>
          <h2>Cart</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleBuy}>Buy</button>
        </div>
      )}
      {isPurchased && <p>Thank you for your purchase!</p>}
    </div>
  );
}

export default BuyItemPage;
