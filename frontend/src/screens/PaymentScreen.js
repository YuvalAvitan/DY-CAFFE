import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history, match }) => {
  const cart = useSelector((state) => state.cart);
  const { Table } = cart;

  if (!Table) {
    history.push(`/seating/${match.params.name}`);
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeorder/${match.params.name}`);
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 match={match} />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          {!localStorage.getItem("replace_id") ? (
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Cash"
                id="Cash"
                name="paymentMethod"
                value="Cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          ) : (
            <Col>
              {localStorage.getItem("paymentMethod") === "Cash" ? (
                <Form.Check
                  type="radio"
                  label="Cash"
                  id="Cash"
                  name="paymentMethod"
                  value="Cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              ) : (
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              )}
            </Col>
          )}
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
