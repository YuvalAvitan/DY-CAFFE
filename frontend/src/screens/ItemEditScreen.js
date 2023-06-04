import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateItem, getItem } from "../actions/itemActions";
import { ITEM_UPDATE_RESET } from "../constants/itemsConstans";
import { categoriesList as getCategories } from "../actions/categoriesActions";

const ItemEditScreen = ({ match, history }) => {
  const itemId = match.params.id;
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categories } = categoriesList;

  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [prices, setPrice] = useState([]);
  const [image, setImage] = useState("");
  // eslint-disable-next-line
  const [sizes, setSizes] = useState([]);
  // eslint-disable-next-line
  const [category, setCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  // eslint-disable-next-line
  const [ingredients, setIngredients] = useState([""]);

  const [uploading, setUploading] = useState(false);

  const [pricesStr, setPricesStr] = useState("");
  const [sizesStr, setSizesStr] = useState("");
  const [ingsStr, setIngsStr] = useState("");
  const [categoryStr, setCategoryStr] = useState("");

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemUpdate;

  useEffect(() => {
    if (!categories || !categories[0]) {
      dispatch(getCategories());
    }
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });

      history.push("/admin/itemlist");
    } else {
      if (!item || !item.itemName || item._id !== itemId) {
        dispatch(getItem(itemId));
      } else {
        setPricesStr(item.itemPrice.toString());
        setSizesStr(item.itemSize.toString());
        setIngsStr(item.ingredients.toString());
        setCategoryStr(item.category.toString());
        setName(item.itemName);
        setPrice(item.itemPrice);
        setSizes(item.itemSize);
        setIsAvailable(item.isAvailable);
        setDiscount(item.itemDiscount);
        setIngredients(item.ingredients);
        setImage(item.itemPicture);
        setCategory(item.category);
        setDescription(item.itemDescreption);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, successUpdate, history, item, itemId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let temp = pricesStr.split(",");
    let temp2 = sizesStr.split(",");
    let temp3 = ingsStr.split(",");
    let temp4 = categoryStr;
    let flag = false;
    // eslint-disable-next-line
    temp2.map((s) => {
      if (s.length > 1 || s.length < 1) {
        flag = true;
      }
    });
    if (flag) {
      alert("size must be ONE LETTER");
      return;
    }
    // eslint-disable-next-line
    temp.map((s) => {
      if (s.length < 1) {
        flag = true;
      }
    });
    if (flag) {
      alert("Price must be have value");
      return;
    }
    // eslint-disable-next-line
    temp3.map((s) => {
      if (s.length < 1) {
        flag = true;
      }
    });
    if (flag) {
      alert("Ingredients must be have value");
      return;
    }
    if (temp4 === "Sample category") {
      alert("Category must be selected");
      return;
    }

    setPrice((temp) => temp);
    dispatch(
      updateItem({
        _id: itemId,
        name,
        prices: temp,
        image,
        sizes: temp2,
        category: temp4,
        description,
        isAvailable,
        discount,
        ingredients: temp3,
      })
    );
  };

  return (
    <>
      <Link to="/admin/itemlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={pricesStr}
                onChange={(e) => setPricesStr(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                onChange={uploadFileHandler}
                id="image-file"
                type="file"
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="sizes">
              <Form.Label>Sizes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sizes"
                value={sizesStr}
                onChange={(e) => setSizesStr(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAvailable">
              <Form.Check
                type="checkbox"
                label="Is Available"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={categoryStr}
                onChange={(e) => setCategoryStr(e.target.value)}
              >
                {categories.map((x, i) => (
                  <option key={i} value={x.name}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="ingredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ingredients"
                value={ingsStr}
                onChange={(e) => setIngsStr(e.target.value)}
              ></Form.Control>
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

export default ItemEditScreen;
