import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
