import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <Cart /> {/* Display cart items */}
    </div>
  );
};

export default CartPage;
