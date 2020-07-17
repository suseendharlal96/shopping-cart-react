import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/authcontext";

const App=(props)=> {
  return (
    <BrowserRouter>
      <main>
        <AuthProvider>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/orders" exact component={Orders} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/auth" exact component={Auth} />
            </Switch>
          </Container>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
