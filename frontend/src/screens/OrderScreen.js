import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  PaidOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAID_RESET,
} from "../constants/orderConstants";
import { availableUpdate } from "../actions/tableActions";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPaid = useSelector((state) => state.orderPaid);
  const { loading: loadingPaid, success: successPaid } = orderPaid;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successDeliver ||
      order._id !== orderId ||
      successPaid
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_PAID_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, orderId, successPay, successDeliver, order, successPaid]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    if (order.tableNumber[0] !== "Take Away") {
      dispatch(availableUpdate(order.tableNumber));
    }
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const orderPaidHandler = () => {
    dispatch(PaidOrder(order));
    if (order.tableNumber[0] !== "Take Away") {
      dispatch(availableUpdate(order.tableNumber));
    }
    window.location.reload();
  };
  const replaceHandler = () => {
    localStorage.setItem("replace_id", order.totalPrice);
    localStorage.setItem("replace_date", order._id);
    localStorage.setItem("paymentMethod", order.paymentMethod);
    history.push("/menu");
  };
  const CancelreplaceHandler = () => {
    localStorage.removeItem("replace_id");
    history.push("/signin");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.orderName}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Tables:</strong>
                {order.tableNumber.toString().split(",").join(",")}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                          <Link to={`/items/${item.product}`}>{item.name}</Link>
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
              {order.user.isVipClient && (
                <ListGroup.Item>
                  <Row>You got 5% VIP</Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.paymentMethod !== "Cash" && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                (userInfo.isAdmin || userInfo.isBarista) &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              {loadingPaid && <Loader />}
              {userInfo &&
                (userInfo.isAdmin || userInfo.isBarista) &&
                !order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={orderPaidHandler}
                    >
                      Mark As Paid
                    </Button>
                  </ListGroup.Item>
                )}
              {userInfo &&
                order.isPaid &&
                !order.isDelivered &&
                !localStorage.getItem("replace_id") && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={replaceHandler}
                    >
                      Replace Order
                    </Button>
                  </ListGroup.Item>
                )}
              {userInfo && localStorage.getItem("replace_id") && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={CancelreplaceHandler}
                  >
                    Cancel Replace Order
                  </Button>
                </ListGroup.Item>
              )}
              {userInfo &&
                !order.isPaid &&
                order.totalPrice <= 0 &&
                orderPaidHandler()}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
