import React, { useState, useEffect } from "react";

import { Card, Button, Image, Grid } from "semantic-ui-react";
import axios from "axios";
import MyModal from "../components/MyModal";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("/products")
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (product) => {
    axios
      .post("/products", product)
      .then((res) => {
        setModal(false);
        console.log(res.data);
        if (res.data && res.data.createdProduct) {
          getProducts();
        }
      })
      .catch((err) => console.log(err));
  };

  const productContent = products ? (
    products.length ? (
      products.map((product) => (
        <Card fluid key={product._id}>
          <Card.Content>
            <Image floated="right" size="tiny" src={product.image} />
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>{product.price}</Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button inverted color="green">
              Add to Cart
            </Button>
          </Card.Content>
        </Card>
      ))
    ) : (
      <p>No products</p>
    )
  ) : (
    <p>Loading</p>
  );
  const closeModal = () => {
    setModal(false);
  };

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Button primary onClick={() => setModal(true)}>
          Create Product
        </Button>
      </Grid.Row>
      <MyModal
        open={modal}
        submit={(product) => submitHandler(product)}
        close={() => setModal(false)}
      />
      <Grid.Row>{productContent}</Grid.Row>
    </Grid>
  );
};

export default Home;
