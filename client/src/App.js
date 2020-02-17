import React from "react";
import Layout from "./Components/Layout";
//import Campaigns from "./Components/Campaigns";
import Home from "./Components/Home";
import { Switch, Route } from "react-router-dom";
import Campaigns from "./Components/Campaigns";
import Tasks from "./Components/Tasks";

export default function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/campaigns" component={Campaigns} />
          <Route path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}
