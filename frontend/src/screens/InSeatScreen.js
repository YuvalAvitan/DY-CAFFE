import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { insideTables as getTables } from "../actions/tableActions";
import { Button } from "react-bootstrap";
import { saveTable } from "../actions/cartActions";
import { roomsList as getRooms } from "../actions/roomsActions";

const InSeatScreen = ({ history, match }) => {
  const insideTables = useSelector((state) => state.insideTables);
  const { loading, error, tables } = insideTables;
  const [tablesArr, setTablesArr] = useState([]);
  const dispatch = useDispatch();
  const roomsList = useSelector((state) => state.roomsList);
  // eslint-disable-next-line
  const { loading: loading1, error: error1, rooms } = roomsList;
  useEffect(() => {
    dispatch(getTables());
    dispatch(getRooms());
  }, [dispatch]);

  const setTablesOrder = (e) => {
    var temp = tablesArr;
    if (temp.length > 3) {
      alert("Can't choose over 4 tables");
      history.push(`/seating/${match.params.name}`);
      return;
    }
    if (!tablesArr.includes(e.target.value)) {
      temp = tablesArr;
      temp.push(e.target.value);
      setTablesArr(temp);
    } else {
      temp = tablesArr.filter((x) => x !== e.target.value);
      setTablesArr(temp);
    }

    dispatch(saveTable(tablesArr));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          {rooms
            .filter((x) => x.Inside === false)
            .map(
              (r) =>
                r.isAvailable &&
                tables.map((x) => {
                  return (
                    <div key={x._id + 1} style={{ display: "inline-block" }}>
                      {x.Seats > 2 ? (
                        // eslint-disable-next-line
                        <img
                          key={x._id + 2}
                          className="seatImg2"
                          src="/table4.png"
                        />
                      ) : (
                        // eslint-disable-next-line
                        <img
                          key={x._id + 3}
                          className="seatImg2"
                          src="/table.png"
                        />
                      )}
                      <br />
                      <label
                        key={x._id + 4}
                        className="mx-1"
                        for={x.TableNumber}
                      >
                        {x.TableNumber}
                      </label>
                      <br />
                      <div key={x._id + 5} style={{ margin: "0 1.85rem" }}>
                        <input
                          key={x._id + 6}
                          className="mx-1"
                          type="checkbox"
                          id={x._id}
                          name="table"
                          value={x.TableNumber}
                          disabled={!x.isAvailable}
                          onClick={(e) => setTablesOrder(e)}
                        />
                      </div>
                    </div>
                  );
                })
            )}
        </>
      )}
      <br />
      <Button
        onClick={() =>
          tablesArr.length > 0
            ? history.push(`/payment/${match.params.name}`)
            : null
        }
        className="myFont myButton"
      >
        Continue
      </Button>
      <Button
        onClick={() => history.push(`/seating/${match.params.name}`)}
        className="myFont myButton"
      >
        Back
      </Button>
    </>
  );
};

export default InSeatScreen;
