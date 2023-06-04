import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const NameScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const submitHandler = () => {
    if (!name || name.length < 2) {
      const temp = errors;
      temp.push({ msg: "Name is required and must be at lest 2 letters" });
      setErrors(temp);
    }
    if (name.length > 20) {
      const temp = errors;
      errors.push({ msg: "Name cant be more than 20 letters" });
      setErrors(temp);
    }
    if (errors.length > 0) {
      errors.map((e) => alert(e.msg));
    } else {
      history.push(`/seating/${name}`);
    }
  };
  return (
    <>
      <FormContainer>
        <h1>Enter Name</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default NameScreen;
