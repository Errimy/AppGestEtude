import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users2";
import AddUser from "./user/pages/AddUser";
import Classe from "./classe/pages/Classe";
import AccueilButtons from "./Accueil/components/AccueilButtons";
import Login from "./Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Mainnav from "./shared/components/Mainnav";

function App() {
  return (
    <Router>
      <Mainnav />
      <main>
        {/* main pour ajouter la marge entre la bar de nav et le contenu css du mainnav */}
        <Switch>
          <Route path="/" exact>
            <AccueilButtons />
          </Route>
          <Route path="/Accueil" exact>
            <AccueilButtons />
          </Route>
          <Route path="/Classe" exact>
            <Classe />
          </Route>
          <Route path="/AddUser" exact>
            <AddUser />
          </Route>
          <Route path="/Users" exact>
            <Users />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
