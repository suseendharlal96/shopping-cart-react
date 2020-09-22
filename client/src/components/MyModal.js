import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Modal, Button, Form } from "semantic-ui-react";

import * as action from "../store/actions/index";

const MyModal = (props) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [updateId, setupdateId] = useState(null);

  useEffect(() => {
    if (props && props.updateProduct) {
      setProduct({
        ...product,
        name: props.updateProduct.name,
        price: props.updateProduct.price,
        image: props.updateProduct.image,
        description: props.updateProduct.description,
      });
      setupdateId(props.updateProduct._id);
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
      image: "",
      description: "",
    });
    props.close();
  };

  const submit = () => {
    props.submit(
      product,
      updateId,
      props.token,
      props.activePage,
      props.currentLimit
    );
    props.close();
    setupdateId(null);
  };

  return (
    <Modal size="small" open={props.open} onClose={reset}>
      <Modal.Header>{updateId ? "Update" : "Post"} a Product!</Modal.Header>
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
              name="image"
              //   error={errors && errors.price ? errors.price : null}
              type="text"
              value={product.image || ""}
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

const mapStateToProps = (state) => {
  return { token: state.authReducer.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (product, updateId, token, activePage, currentLimit) =>
      dispatch(
        action.updateProduct(product, updateId, token, activePage, currentLimit)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
