import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateTable, getTable } from "../actions/tableActions";
import { TABLES_UPDATE_RESET } from "../constants/tableConstants";

const TableEditScreen = ({ match, history }) => {
  const tableId = match.params.id;
  const getTable1 = useSelector((state) => state.getTable);
  const { loading, error, table } = getTable1;

  const [TableNumber, setTableNumber] = useState();
  const [Seats, setSeats] = useState();
  const [isAvailable, setisAvailable] = useState();
  const [Inside, setInside] = useState();

  const dispatch = useDispatch();

  const tableUpdate = useSelector((state) => state.tableUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tableUpdate;

  useEffect(() => {
    dispatch({ type: TABLES_UPDATE_RESET });
    if (!table || !table._id || tableId !== table._id) {
      dispatch(getTable(tableId));
    } else {
      setTableNumber(table.TableNumber);
      setSeats(table.Seats);
      setisAvailable(table.isAvailable);
      setInside(table.Inside);
      dispatch({ type: TABLES_UPDATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: TABLES_UPDATE_RESET });

      history.push("/admin/tablelist");
      window.location.reload();
    }
    dispatch({ type: TABLES_UPDATE_RESET });
  }, [dispatch, successUpdate, history, table, tableId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTable({
        _id: tableId,
        TableNumber,
        Seats,
        isAvailable,
        Inside,
      })
    );
    dispatch({ type: TABLES_UPDATE_RESET });
  };

  return (
    <>
      <Link to="/admin/tablelist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Table</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="TableNumber">
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Table Number"
                value={TableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="seats">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                as="select"
                value={Seats}
                onChange={(e) => setSeats(e.target.value)}
              >
                <option key={1} value={2}>
                  {2}
                </option>
                <option key={2} value={4}>
                  {4}
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isAvailable">
              <Form.Check
                type="checkbox"
                label="Is Available"
                checked={isAvailable}
                onChange={(e) => setisAvailable(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="inside">
              <Form.Check
                type="checkbox"
                label="Is inside"
                checked={Inside}
                onChange={(e) => setInside(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default TableEditScreen;
