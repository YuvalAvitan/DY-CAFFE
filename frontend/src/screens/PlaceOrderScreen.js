import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder, deleteOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [newPrice, setnewPrice] = useState();
  const [tables, setTables] = useState("");
  const [email, setEmail] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.new_price * item.qty, 0)
  );

  cart.totalPrice = Number(cart.itemsPrice).toFixed(2);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    setnewPrice(cart.totalPrice);
    if (localStorage.getItem("replace_id")) {
      isReplace();
    }
    if (!cart.Table || cart.Table.length === 0) {
      history.push(`/seating/${match.params.name}`);
    } else if (!cart.paymentMethod) {
      history.push(`/payment/${match.params.name}`);
    } else {
      setTables(cart.Table.toString().split(",").join(","));
    }

    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }

    // eslint-disable-next-line
  }, [history, success, cart.Table]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        tableNumber: cart.Table,
        paymentMethod: cart.paymentMethod,
        totalPrice: newPrice,
        orderName: match.params.name,
        email: email,
      })
    );
    dispatch(deleteOrder(localStorage.getItem("replace_date")));
    localStorage.removeItem("replace_id");
  };
  const isReplace = () => {
    cart.totalPrice =
      Number(cart.totalPrice) - localStorage.getItem("replace_id");
    setnewPrice(cart.totalPrice);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 match={match} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Name: </h2>
              <p>{match.params.name}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Table</h2>
              <p>
                <strong>Table number:</strong>
                {tables}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/item/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.new_price} = $
                          {item.qty * item.new_price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${newPrice}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && (userInfo.isAdmin || userInfo.isBarista) && (
                <ListGroup.Item
                  as="input"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></ListGroup.Item>
              )}

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
