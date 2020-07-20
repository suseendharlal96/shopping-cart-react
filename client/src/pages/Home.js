import React, { useState, useEffect, useContext } from "react";

import { Card, Button, Image, Grid } from "semantic-ui-react";
import axios from "axios";
import MyModal from "../components/MyModal";

import { AuthContext } from "../context/authcontext";

const Home = (props) => {
  const { token, userId, setUpdateProduct, updateProduct } = useContext(
    AuthContext
  );
  const [products, setProducts] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    getProducts();
    return () => {
      source.cancel();
    };
  }, []);

  const getProducts = () => {
    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (product) => {
    console.log(product)
    if (updateProduct) {
      axios
        .patch(`/products/${updateProduct._id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setModal(false);
          setUpdateProduct(null);
          console.log(res.data);
          if (res.data && res.data.product) {
            getProducts();
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/products", product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setModal(false);
          console.log(res.data);
          if (res.data && res.data.createdProduct) {
            getProducts();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const update = (product) => {
    console.log(product);
    setUpdateProduct(product);
    setModal(true);
  };

  const addToCart = (product) => {
    axios
      .post("/user/cart", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
            <Button inverted onClick={() => addToCart(product)} color="green">
              Add to Cart
            </Button>
            {userId && product.creator === userId && (
              <React.Fragment>
                <Button floated="right" inverted color="red">
                  Delete
                </Button>
                <Button
                  floated="right"
                  onClick={() => update(product)}
                  inverted
                  color="orange"
                >
                  Update
                </Button>
              </React.Fragment>
            )}
          </Card.Content>
        </Card>
      ))
    ) : (
      <p>No products</p>
    )
  ) : (
    <p>Loading</p>
  );

  return (
    <Grid columns={3}>
      <Grid.Row>
        {token ? (
          <Button primary onClick={() => setModal(true)}>
            Create Product
          </Button>
        ) : (
          <Button primary onClick={() => props.history.push("/auth")}>
            Create Product
          </Button>
        )}
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
