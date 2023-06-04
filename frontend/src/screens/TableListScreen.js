import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { TABLES_ADD_RESET } from "../constants/tableConstants";

import {
  insideTables as getInside,
  outsideTables as getOutside,
  deleteTable,
} from "../actions/tableActions";

const TableListScreen = ({ history }) => {
  const dispatch = useDispatch();
  dispatch({ type: TABLES_ADD_RESET });

  const insideTables = useSelector((state) => state.insideTables);
  const { loading, error, tables: inside } = insideTables;

  const outsideTables = useSelector((state) => state.outsideTables);
  const {
    loading: loadingOutside,
    error: errorOutSide,
    tables: outside,
  } = outsideTables;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tableDelete = useSelector((state) => state.tableDelete);
  const { success: successDelete } = tableDelete;

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isBarista)) {
      dispatch({ type: TABLES_ADD_RESET });
      dispatch(getOutside());
      dispatch(getInside());
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTable(id));
    }
  };
  const createTableHandler = () => {
    history.push("/admin/tables/add");
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Inside Tables</h1>
        </Col>
        <Col>
          <Button className="my-3" onClick={createTableHandler}>
            <i className="fas fa-plus"></i> Create Table
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
              <th>TableNumber</th>
              <th>Seats</th>
              <th>isAvailable</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {inside.map((table) => (
              <tr key={table._id}>
                <td>{table._id}</td>
                <td>{table.TableNumber}</td>
                <td>{table.Seats}</td>
                <td>
                  {table.isAvailable ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/tables/${table._id}/edit`}>
                    <Button className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(table._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h1>Outside Tables</h1>
      {loadingOutside ? (
        <Loader />
      ) : errorOutSide ? (
        <Message variant="danger">{errorOutSide}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TableNumber</th>
              <th>Seats</th>
              <th>isAvailable</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {outside.map((table) => (
              <tr key={table._id}>
                <td>{table._id}</td>
                <td>{table.TableNumber}</td>
                <td>{table.Seats}</td>
                <td>
                  {table.isAvailable ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/tables/${table._id}/edit`}>
                    <Button className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(table._id)}
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

export default TableListScreen;
