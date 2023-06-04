import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import Item from "../components/Item";
import { categoriesList as getCategories } from "../actions/categoriesActions";
const MenuScreen = ({ history }) => {
  const categoriesList = useSelector((state) => state.categoriesList);
  const { error, loading, categories } = categoriesList;
  const dispatch = useDispatch();
  const [option, setOption] = useState("");
  const options = [
    "Default",
    "Price:High-Low",
    "Price:Low-High",
    "Most Popular",
    "Items Of The Day",
    "Only In Discount",
  ];
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const directOption = (e) => {
    const temp = e.target.value;
    setOption(temp);
    switch (temp) {
      case "Default":
        history.push("/menu");
        break;
      case "Price:High-Low":
        history.push("/menu2");
        break;
      case "Price:Low-High":
        history.push("/menu3");
        break;
      case "Most Popular":
        history.push("/menu4");
        break;
      case "Items Of The Day":
        history.push("/menu5");
        break;
      case "Only In Discount":
        history.push("/menu6");
        break;

      default:
        history.push("/menu");
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Menu</h1>

          <Form.Control
            style={{
              width: "10%",

              margin: "0 80%",
            }}
            as="select"
            value={option}
            onChange={(e) => directOption(e)}
          >
            {options.map((x, i) => (
              <option key={i + 1} value={x}>
                {x}
              </option>
            ))}
          </Form.Control>
          {categories.map((category) => (
            <>
              <h2> {category.name}</h2>
              <Row>
                {category.items.map((item, index) => (
                  <>
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                      <Item key={index} item={item} />
                    </Col>
                  </>
                ))}
              </Row>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default MenuScreen;
