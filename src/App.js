import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Users from "./user/pages/Users";
import ClasseUser from "./user/pages/ClasseUser";

import AddUser from "./user/pages/AddUser";
import AddClasse from "./classe/pages/AddClasse";
import AddEmploi from "./emploi/pages/AddEmploi";
import AddExamen from "./examen/pages/AddExamen";

import UpdateUser from "./user/pages/UpdateUser";
import UpdateClasse from "./classe/pages/UpdateClasse";
import UpdateEmploi from "./emploi/pages/UpdateEmploi";
import UpdateExamen from "./examen/pages/UpdateExamen";

import Classe from "./classe/pages/Classe";
import AccueilButtons from "./Accueil/components/AccueilButtons";
import Login from "./Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Mainnav from "./shared/components/Mainnav";
import Examens from "./examen/pages/Examens";
import Emplois from "./emploi/pages/Emplois";
import { AuthContext } from "./shared/context/auth-context";

function App()
{
    const [user, setUser] = useState({role : ''});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const login = useCallback(user => {
      setIsLoggedIn(true);
      setUser(user);
    }, []);
  
    const logout = useCallback(() => {
      setIsLoggedIn(false);
      setUser(null);
    }, []);
  
    let routes;

    if(isLoggedIn)
    {
      console.log(user)
      if(user.role === 'admin')
      {
        routes = <Switch>
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
                    <Route path="/AddEmploi" exact>
                      <AddEmploi />
                    </Route>
                    <Route path="/AddExamen" exact>
                      <AddExamen />
                    </Route>
                    <Route path="/Users/:userId" exact>
                      <UpdateUser />
                    </Route>
                    <Route path="/Classes/:classeId" exact>
                      <UpdateClasse />
                    </Route>
                    <Route path="/Emplois/:emploiId" exact>
                      <UpdateEmploi />
                    </Route>
                    <Route path="/Examens/:examenId" exact>
                      <UpdateExamen />
                    </Route>
                    <Route path="/Users" exact>
                      <Users />
                    </Route>
                    <Route path="/Users/classe/:classeId" exact>
                      <ClasseUser />
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
                    <Redirect to="/"/>
                  </Switch>
      }else
      {
        routes = <Switch>
                    <Route path="/" exact>
                      <AccueilButtons />
                    </Route>
                    <Route path="/Accueil" exact>
                      <AccueilButtons />
                    </Route>
                    <Route path="/Classe" exact>
                      <Classe />
                    </Route>
                    <Route path="/Examens" exact>
                      <Examens />
                    </Route>
                    <Route path="/Emplois" exact>
                      <Emplois />
                    </Route>
                    <Redirect to="/"/>
                </Switch>
      }
    }else
    {
        routes = <Switch>
                    <Route path="/Login">
                      <Login />
                    </Route>
                    <Route path="/">
                      <Login />
                    </Route>
                </Switch>
    }


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <Mainnav />
        <main>
          {routes}
        </main>
    </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
