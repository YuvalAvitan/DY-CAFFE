import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import Paginate from '../components/Paginate'
import { ItemsList, deleteItem, createItem } from "../actions/itemActions";
import { ITEM_CREATE_RESET } from "../constants/itemsConstans";

const ItemListScreen = ({ history, match }) => {
  // const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = itemDelete;

  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    item: createdItem,
  } = itemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ITEM_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/signin");
    }

    if (successCreate) {
      history.push(`/admin/items/${createdItem._id}/edit`);
    } else {
      dispatch(ItemsList());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdItem]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteItem(id));
    }
  };

  const createItemHandler = () => {
    dispatch(createItem());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Items</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createItemHandler}>
            <i className="fas fa-plus"></i> Create Item
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Prices</th>
                <th>Category</th>
                <th>Sizes</th>
                <th>isAvailable</th>
                <th>Item Discount</th>
                <th>Number Of Sells</th>
                <th>Ingredients</th>
                <th>Descreption</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td> ${item.itemPrice.toString().split(",").join("/$")}</td>
                  <td>{item.category}</td>
                  <td>{item.itemSize.toString().split(",").join("/")}</td>
                  <td>
                    {item.isAvailable ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>{item.itemDiscount}%</td>
                  <td>{item.num_OF_sells}</td>
                  <td>{item.ingredients.toString().split(",").join(",")}</td>
                  <td>{item.itemDescreption}</td>
                  <td>
                    <LinkContainer to={`/admin/items/${item._id}/edit`}>
                      <Button className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ItemListScreen;
