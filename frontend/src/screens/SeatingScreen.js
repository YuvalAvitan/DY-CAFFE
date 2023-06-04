import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveTable } from "../actions/cartActions";

const SeatingScreen = ({ history, match }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const TakeAwayFunc = () => {
    dispatch(saveTable(["Take Away"]));

    history.push(`/payment/${match.params.name}`);
  };
  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <CheckoutSteps
            style={{ display: "block" }}
            step1
            step2
            match={match}
          />
        </Col>
        <Col></Col>
      </Row>
      {cartItems[0].name !== "VIP USER" &&
        (!cartItems[1] || cartItems[1].name !== "VIP USER") &&
        (!cartItems[2] || cartItems[2].name !== "VIP USER") &&
        (!cartItems[3] || cartItems[3].name !== "VIP USER") &&
        (!cartItems[4] || cartItems[4].name !== "VIP USER") &&
        (!cartItems[5] || cartItems[5].name !== "VIP USER") &&
        (!cartItems[6] || cartItems[6].name !== "VIP USER") &&
        (!cartItems[7] || cartItems[7].name !== "VIP USER") &&
        (!cartItems[8] || cartItems[8].name !== "VIP USER") &&
        (!cartItems[9] || cartItems[9].name !== "VIP USER") && (
          <>
            <Row>
              <Col></Col>
              <Col>
                <Button
                  onClick={() => history.push(`/outside/${match.params.name}`)}
                  className="myFont myButton"
                >
                  Outside
                </Button>
                <Button
                  onClick={() => history.push(`/inside/${match.params.name}`)}
                  className="myFont myButton"
                >
                  Inside
                </Button>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <> .</>
              </Col>
            </Row>
          </>
        )}

      <Row>
        <Col></Col>

        <Col>
          <Button onClick={TakeAwayFunc} className="myFont myButton">
            Take Away
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default SeatingScreen;
