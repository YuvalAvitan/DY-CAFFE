import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Item from "../components/Item";
import { ItemsList } from "../actions/itemActions";
const MenuScreen2 = ({ history }) => {
  const itemList = useSelector((state) => state.itemList);
  const { error, loading, items } = itemList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ItemsList());
  }, [dispatch]);

  const sortedList = items
    .filter((x) => x.isAvailable === true)
    .sort((a, b) => {
      return b.itemDiscount - a.itemDiscount;
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Row>
            {sortedList.map((item, index) => (
              <>
                <>
                  {index > 3 ? null : (
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                      <Item key={index} item={item} />
                    </Col>
                  )}
                </>
              </>
            ))}
          </Row>
          <Row>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  type="button"
                  className="btn-block"
                  onClick={() => history.push("/menu4")}
                >
                  Most Popular
                </Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  type="button"
                  className="btn-block"
                  onClick={() => history.push("/menu5")}
                >
                  Items Of The Day
                </Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  type="button"
                  className="btn-block"
                  onClick={() => history.push("/menu6")}
                >
                  Only In Discount
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default MenuScreen2;
