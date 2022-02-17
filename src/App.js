import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import AddUser from "./user/pages/AddUser";
import AddClasse from "./classe/pages/AddClasse";
import UpdateUser from "./user/pages/UpdateUser";
import UpdateClasse from "./classe/pages/UpdateClasse";

import Classe from "./classe/pages/Classe";
import AccueilButtons from "./Accueil/components/AccueilButtons";
import Login from "./Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Mainnav from "./shared/components/Mainnav";
import Examens from "./examen/pages/Examens";
import Emplois from "./emploi/pages/Emplois";

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
          <Route path="/AddClasse" exact>
            <AddClasse />
          </Route>
          <Route path="/Users/:userId" exact>
            <UpdateUser />
          </Route>
          <Route path="/Classes/:classeId" exact>
            <UpdateClasse />
          </Route>
          <Route path="/Users" exact>
            <Users />
          </Route>
          <Route path="/Login" exact>
            <Login />
          </Route>
          <Route path="/Examens" exact>
            <Examens />
          </Route>
          <Route path="/Emplois" exact>
            <Emplois />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
