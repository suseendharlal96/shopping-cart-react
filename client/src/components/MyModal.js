import React, { useState, useEffect, useContext } from "react";

import { Modal, Button, Form } from "semantic-ui-react";

import { AuthContext } from "../context/authcontext";

const MyModal = (props) => {
  const { updateProduct } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageurl: "",
  });

  useEffect(() => {
    if (updateProduct) {
      setProduct({
        ...product,
        name: updateProduct.name,
        price: updateProduct.price,
        imageurl: updateProduct.image,
        description: updateProduct.description,
      });
    }
  }, [props]);

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setProduct({
      ...product,
      name: "",
      price: "",
      imageurl: "",
      description: "",
    });
    props.close();
  };

  const submit = () => {
    props.submit(product);
  };

  return (
    <Modal size="small" open={props.open} onClose={reset}>
      <Modal.Header>
        {props.product ? "Update" : "Post"} a Product!
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Form.Input
              name="name"
              //   error={errors && errors.title ? errors.title : null}
              value={product.name || ""}
              placeholder="Name.."
              onChange={onChangeInput}
            />
            <Form.Input
              name="price"
              //   error={errors && errors.date ? errors.date : null}
              value={product.price || ""}
              type="Number"
              placeholder="Price.."
              onChange={onChangeInput}
            />
            <Form.Input
              name="imageurl"
              //   error={errors && errors.price ? errors.price : null}
              type="text"
              value={product.imageurl || ""}
              placeholder="Image link.."
              onChange={onChangeInput}
            />
            <Form.TextArea
              name="description"
              //   error={errors && errors.description ? errors.description : null}
              value={product.description || ""}
              placeholder="Description.."
              onChange={onChangeInput}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={reset}
          negative
          icon="cancel"
          content="Cancel"
          labelPosition="right"
        />
        <Button
          onClick={submit}
          positive
          icon="checkmark"
          labelPosition="right"
          content="Submit"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default MyModal;
