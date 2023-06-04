import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const itemId = match.params.id;

  const qty = location.search
    ? Number(location.search.split("&")[0].split("=")[1])
    : 1;

  const size = location.search
    ? String(location.search.split("&")[1].split("=")[1])
    : "Error size";

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (itemId) {
      dispatch(addToCart(itemId, qty, size));
      history.push("/cart");
    }
  }, [dispatch, itemId, qty, size, history]);

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=name");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/items/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.size}</Col>
                  <Col md={3}>
                    {item.itemDiscount ? (
                      <>
                        {" "}
                        <del>${item.price} </del> ${item.new_price}{" "}
                      </>
                    ) : (
                      "$" + item.price
                    )}
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      className="text-center"
                      value={item.qty}
                      style={{ display: "inline-block" }}
                    ></Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      onClick={() => removeFromCartHandler(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.new_price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
