import React, { useContext } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Ecom } from '../context/Api';


const Cards = () => {
  const { filteredProducts, cart, setCart } = useContext(Ecom);

  // Add item to cart or increase quantity if already in cart
  const addToCart = (item) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      // Item is already in the cart, increase the quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
      
    } else {
      // Item not in cart, add with initial quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
      
    }
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  
  };

  return (
    <Container className="mt-5">
      <Row className="g-4">
        {filteredProducts.map((item) => {
          const cartItem = cart.find((cartItem) => cartItem.id === item.id);
          const isInCart = !cartItem; // Check if the item is in the cart

          return (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0 p-3 mt-2 product-card">
                <div className="image-container">
                  <Card.Img
                    className="product-image"
                    variant="top"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center product-title">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-center product-price">
                    Rs {item.price}
                  </Card.Text>
                  <Card.Text className="description text-center product-description">
                    {item.description}
                  </Card.Text>
                  {!isInCart ? (
                    <Button
                      variant="danger"
                      className="mt-auto"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Cards;
