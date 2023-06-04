import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { addCategory } from "../actions/categoriesActions";

const CategoryAddScreen = ({ history }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || name.length < 2) {
      alert("Category Name is required and must be longer than 2 letters");
    } else {
      dispatch(addCategory(name));
      history.push("/admin/categorieslist");
    }
  };
  return (
    <FormContainer>
      <h1>Add category</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Add
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CategoryAddScreen;
