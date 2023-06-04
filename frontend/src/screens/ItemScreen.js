import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getItem } from "../actions/itemActions";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const ItemScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState("");
  const [prices, setPrices] = useState("");
  const [newPrices, setNewPrices] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (!item || !item.itemName || item._id !== match.params.id) {
      dispatch(getItem(match.params.id));
    } else {
      setSizes(item.itemSize.toString().split(",").join("/"));
      setPrices(item.itemPrice.toString().split(",").join("/$"));
      let temp = item.itemPrice.map(
        (p) =>
          Math.round(
            (p * ((100 - item.itemDiscount) / 100) + Number.EPSILON) * 100
          ) / 100
      );
      setNewPrices(temp.toString().split(",").join("/$"));
      setIngredients(item.ingredients);
    }
  }, [item, match.params.id, dispatch]);
  const addToCartHandler = () => {
    if (size === "") {
      history.push(`/cart/${match.params.id}?qty=${qty}&size=${sizes[0]}`);
      return;
    }
    history.push(`/cart/${match.params.id}?qty=${qty}&size=${size}`);
  };

  const sub = () => {
    const temp = qty - 1;
    if (temp < 1) {
      setQty(1);
    } else {
      setQty(temp);
    }
  };

  const add = () => {
    const temp = qty + 1;
    setQty(temp);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image
                className="myImg"
                src={item.itemPicture}
                alt={item.itemName}
                fluid
              />
            </Col>
            <Col md={3}>
              <Card className="my-3 p-3 rounded ">
                <Card.Body>
                  <Card.Title as="div">
                    <h5>{item.itemName}</h5>
                    <p className="discountoutofstock">
                      {!item.isAvailable && " (Not Available right now)"}
                    </p>
                    {item.itemDiscount > 0 && (
                      <h5 className="discountcolor">
                        {item.itemDiscount}% DISCOUNT!!
                      </h5>
                    )}
                  </Card.Title>

                  <Card.Text as="h6">
                    {ingredients.map((i) => (
                      <li>{i}</li>
                    ))}
                  </Card.Text>

                  <Card.Text as="h6">{sizes}</Card.Text>
                  <br />
                  <Card.Text as="h6">
                    {item.itemDiscount > 0 ? (
                      <>
                        <del>
                          {"$"}
                          {prices}
                        </del>
                        <br />
                        {"$"}
                        {newPrices}
                      </>
                    ) : (
                      <>
                        {"$"}
                        {prices}
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="my-3 p-3 rounded " bg="flush">
                <ListGroup variant="black">
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>Size</Col>

                      <Col md={2}></Col>

                      <Col md={3}>
                        {" "}
                        <Form.Control
                          as="select"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {sizes.split("/").map((x, i) => (
                            <option key={i + 1} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}></Col>
                    </Row>
                  </ListGroup.Item>

                  {item.isAvailable && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Qty</Col>
                        <Col md={2}>
                          <Button
                            onClick={sub}
                            className="btn-block"
                            type="button"
                            style={{ display: "inline-block" }}
                          >
                            -
                          </Button>
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            value={qty}
                            style={{ display: "inline-block" }}
                          ></Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            onClick={add}
                            className="btn-block"
                            type="button"
                            style={{ display: "inline-block" }}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={!item.isAvailable}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Link className="btn btn-secondary my-3" to="/">
        Go Back
      </Link>
    </>
  );
};

export default ItemScreen;
