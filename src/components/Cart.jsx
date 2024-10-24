import React, { useContext } from 'react';
import { Ecom } from '../context/Api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiAddLargeLine } from 'react-icons/ri';
import { FaMinus } from 'react-icons/fa';

function Cart() {
  const { cart, setCart } = useContext(Ecom);

  // Remove item completely from the cart
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // Increase the quantity of the item
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease the quantity of the item
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    setCart(updatedCart);
  };

  // Handle scroll to increase/decrease quantity
  const handleScroll = (event, id) => {
    const delta = Math.sign(event.deltaY);
    if (delta < 0) {
      increaseQuantity(id); // Scroll up to increase
    } else {
      decreaseQuantity(id); // Scroll down to decrease
    }
  };

  // Calculate total price and total items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0 + 44);

  return (
    <div className="container my-5">
      {cart.length > 0 ? (
        <div className="row">
          {/* Cart items */}
          <div className="col-md-8">
            {cart.map((item) => {
              const { id, title, image, quantity, price } = item;
              return (
                <div
                  key={id}
                  className="card mb-3"
                  style={{ border: '1px solid #dee2e6' }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={image}
                        alt={title}
                        className="img-fluid rounded-start p-2"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between">
                      <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Rs {price}</h6>
                        <div
                          className="d-flex justify-content-between align-items-center"
                          onWheel={(event) => handleScroll(event, id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <p className="card-text mb-0">Quantity: {quantity}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between p-2">
                        <div>
                          <Button variant="success pb-2" onClick={() => increaseQuantity(id)}>
                          <RiAddLargeLine />
                          </Button>
                          <Button variant="danger" onClick={() => decreaseQuantity(id)} className="mx-2">
                          <FaMinus />
                          </Button>
                        </div>
                        <Button variant="danger" onClick={() => removeItem(id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Summary */}
          <div className="col-md-4">
            <div className=" checkout-summary p-4 border rounded-3">
              <h2 className="fw-bold">Checkout Summary</h2>
              <p className='fw-bolder'>Total Items: {totalItems}</p>
              <p className='fw-bold  h3 '> Convenience : Rs 44
              </p>
              <p className='h3'>Total Price: Rs {totalPrice.toFixed(2)}</p>
              <Button variant="dark" className="mt-3">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-2 bg-danger rounded-4 mx-auto p-5 text-center m-5" style={{ height: 'max-content', width: 'max-content' }}>
          <h1 className="m-5 fw-bold text-white">Bag is Empty</h1>
          <p className="display-4">😥</p>
          <Link to="/">
            <Button className="m-5" variant="dark">
              Shop Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
