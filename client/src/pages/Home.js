import React, { useState, useEffect, useContext } from "react";

import { Card, Button, Image, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import MyModal from "../components/MyModal";
import { AuthContext } from "../context/authcontext";

const Home = (props) => {
  toast.configure();
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
      .get("https://node-shop-cart.herokuapp.com/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble fetching.Please try again!");
      });
  };

  const submitHandler = (product) => {
    if (updateProduct) {
      axios
        .patch(
          `https://node-shop-cart.herokuapp.com/products/${updateProduct._id}`,
          product,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Product updated successfully");
          setModal(false);
          setUpdateProduct(null);
          if (res.data && res.data.product) {
            getProducts();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("There was some trouble.Please try again!");
        });
    } else {
      axios
        .post("https://node-shop-cart.herokuapp.com/products", product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product added successfully");
          setModal(false);
          if (res.data && res.data.createdProduct) {
            getProducts();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("There was some trouble.Please try again!");
        });
    }
  };

  const update = (product) => {
    setUpdateProduct(product);
    setModal(true);
  };

  const deleteProduct = (prodId) => {
    axios
      .delete(`https://node-shop-cart.herokuapp.com/products/${prodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Product deleted successfully");
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble.Please try again!");
      });
  };

  const addToCart = (product) => {
    axios
      .post("https://node-shop-cart.herokuapp.com/user/cart", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Product added to Cart.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was some trouble.Please try again!");
      });
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
                <Button
                  floated="right"
                  onClick={() => deleteProduct(product._id)}
                  inverted
                  color="red"
                >
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
