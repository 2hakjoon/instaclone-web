import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import { Login } from "./screens/Login";
import NotFound from "./screens/NotFound";
import {darkModeVar, isLoggedInVar} from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./styles";
import { SignUp } from "./screens/SignUp";
import { routes } from "./routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn= useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles/>
          <Router>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
                {!isLoggedIn ? (
                  <Route path={routes.signUp}>
                    <SignUp />
                  </Route>
                ): null}
              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
