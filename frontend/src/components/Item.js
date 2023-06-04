import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Item = ({ item }) => {
  let sizes = item.itemSize.toString().split(",").join("/");
  let prices = item.itemPrice.toString().split(",").join("/$");

  let newPrices = item.itemPrice.map(
    (p) =>
      Math.round(
        (p * ((100 - item.itemDiscount) / 100) + Number.EPSILON) * 100
      ) / 100
  );
  newPrices = newPrices.toString().split(",").join("/$");
  return (
    <Card className="my-3 p-3 rounded myCard">
      <Link to={`/items/${item._id}`}>
        <Card.Img src={item.itemPicture} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/items/${item._id}`}>
          <Card.Title as="div">
            <strong>{item.itemName}</strong>
            <br />
            <p style={{ display: "inline" }} className="discountoutofstock">
              {!item.isAvailable && " (Not Available right now)"}
            </p>
            {item.itemDiscount > 0 && (
              <h5 className="discountcolor">{item.itemDiscount}% DISCOUNT!!</h5>
            )}
          </Card.Title>
        </Link>
        <Card.Text as="h6">{item.itemDescreption}</Card.Text>

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
  );
};

export default Item;
