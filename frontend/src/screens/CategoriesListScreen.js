import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  DeleteCategory,
  categoriesList as getCategories,
} from "../actions/categoriesActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoriesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteCategory = useSelector((state) => state.deleteCategory);
  const { success: successDelete } = deleteCategory;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getCategories());
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(DeleteCategory(id));
    }
  };

  const createCategoryHandler = () => {
    history.push(`/admin/categories/add`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCategoryHandler}>
            <i className="fas fa-plus"></i> Create Category
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>

                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(category._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
