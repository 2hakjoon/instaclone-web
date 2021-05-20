import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import { Login } from "./screens/Login";
import NotFound from "./screens/NotFound";
import {darkModeVar, isLoggedInVar} from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles";

function App() {
  const isLoggedIn= useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={}>
      <GlobalStyles>

        <Router>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
