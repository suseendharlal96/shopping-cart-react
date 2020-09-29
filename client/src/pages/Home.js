import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Card,
  Button,
  Image,
  Grid,
  Transition,
  Pagination,
  Dropdown,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as actions from "../store/actions/index";

import MyModal from "../components/MyModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
// import { AuthContext } from "../context/authcontext";

const Home = (props) => {
  toast.configure();
  const [activePage, setActivePage] = useState(1);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [limits, setLimits] = useState([
    { key: 1, text: "2", value: 2 },
    { key: 2, text: "5", value: 5 },
    { key: 3, text: "10", value: 10 },
  ]);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    props.getProducts(activePage, currentLimit, props.token);
    if (props.error) {
      toast.error(props.error);
    }
    return () => {
      source.cancel();
    };
  }, [activePage, currentLimit]);

  const update = (product) => {
    setUpdateProduct(product);
    setModal(true);
  };

  const paginate = (e, data) => {
    console.log(data);
    setActivePage(data.activePage);
  };

  const setPageLimit = (e, data) => {
    console.log(data);
    setCurrentLimit(data.value);
  };

  const productContent = props.products ? (
    props.products.length > 0 &&
    props.paginationInfo &&
    props.paginationInfo.totalPage ? (
      <React.Fragment>
        {props.products.map((product) => (
          <Transition.Group
            key={product._id}
            animation="vertical flip"
            duration={800}
          >
            <Card fluid>
              <Card.Content>
                <Image floated="right" size="tiny" src={product.image} />
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>{product.price}</Card.Meta>
                <Card.Description>{product.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  inverted
                  onClick={() => props.addToCart(product, props.token)}
                  color="green"
                >
                  Add to Cart
                </Button>
                {props.userId && product.creator === props.userId && (
                  <React.Fragment>
                    <Button
                      floated="right"
                      onClick={() =>
                        props.deleteProduct(
                          product._id,
                          props.token,
                          activePage,
                          currentLimit
                        )
                      }
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
          </Transition.Group>
        ))}
      </React.Fragment>
    ) : (
      <p>No products</p>
    )
  ) : (
    <LoadingSkeleton />
  );

  return (
    <div>
      <Grid.Row>
        {props.token ? (
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
        close={() => setModal(false)}
        updateProduct={updateProduct}
        activePage={activePage}
        currentLimit={currentLimit}
      />
      {props.products &&
        props.products.length > 0 &&
        props.paginationInfo &&
        props.paginationInfo.totalPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Grid.Column>
              <Pagination
                firstItem="first"
                lastItem="last"
                prevItem="previous"
                nextItem="next"
                defaultActivePage={activePage}
                onPageChange={paginate}
                totalPages={
                  props.paginationInfo && props.paginationInfo.totalPage
                }
              />
            </Grid.Column>
            <Grid.Column>
              <span>
                <label>Records per page</label>
                <Dropdown
                  placeholder="2"
                  search
                  options={limits}
                  onChange={setPageLimit}
                  selection
                  floating
                />
              </span>
            </Grid.Column>
          </div>
        )}
      <Grid.Row>{productContent}</Grid.Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    paginationInfo: state.productReducer.paginationInfo,
    error: state.productReducer.error,
    userId: state.authReducer.userId,
    token: state.authReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (activePage, currentLimit, authtoken) =>
      dispatch(actions.getProducts(activePage, currentLimit, authtoken)),
    deleteProduct: (id, token, activePage, currentLimit) =>
      dispatch(actions.deleteProduct(id, token, activePage, currentLimit)),
    addToCart: (product, token) => dispatch(actions.addToCart(product, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
