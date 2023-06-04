import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { addTable } from "../actions/tableActions";
import { TABLES_ADD_RESET } from "../constants/tableConstants";
import {
  insideTables as insideTablesAction,
  outsideTables as outsideTablesAction,
} from "../actions/tableActions";
const AddTableScreen = ({ match, history }) => {
  const insideTables = useSelector((state) => state.insideTables);
  // eslint-disable-next-line
  const { loading: loadingin, error: errorin, tables: inside } = insideTables;
  const outsideTables = useSelector((state) => state.outsideTables);
  // eslint-disable-next-line
  const { tables: outside } = outsideTables;
  const [TableNumber, setTableNumber] = useState();
  const [Seats, setSeats] = useState(2);
  const [isAvailable, setisAvailable] = useState();
  const [Inside, setInside] = useState();
  // eslint-disable-next-line
  const [seatsArr, setseatsArr] = useState();
  const tableAdd = useSelector((state) => state.tableAdd);
  const { loading, error } = tableAdd;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!outside || !inside) {
      dispatch(insideTablesAction());
      dispatch(outsideTablesAction());
    }
  });
  const checkNumber = (x) => {
    let flag = false;
    // eslint-disable-next-line
    outside.map((t) => {
      if (t.TableNumber === x) {
        flag = true;
      }
    });
    // eslint-disable-next-line
    inside.map((t) => {
      if (t.TableNumber === x) {
        flag = true;
      }
    });
    return flag;
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (Number(TableNumber) > 0 && !checkNumber(Number(TableNumber))) {
      dispatch(
        addTable({
          TableNumber: Number(TableNumber),
          Seats: Number(Seats),
          isAvailable,
          Inside,
        })
      );
      dispatch({ type: TABLES_ADD_RESET });
      history.push("/admin/tablelist");
    } else if (Number(TableNumber) <= 0) {
      alert("Table Number have to be between 1-999");
      history.push("/admin/tables/add");
    } else {
      alert("Table Number is taken");
      history.push("/admin/tables/add");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/admin/tablelist" className="btn btn-light my-3">
            Go Back
          </Link>
          <FormContainer>
            <h1>Add Table</h1>
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
                  value={seatsArr}
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
                Add
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};
export default AddTableScreen;
