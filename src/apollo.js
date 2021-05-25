import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";


export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
})

export const logUserIn = (token) =>{
    localStorage.setItem(TOKEN, token)
    isLoggedInVar(true);
}

export const logUserOut = () =>{
    localStorage.removeItem(TOKEN)
    window.location.reload();
}

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "true");
    darkModeVar(true)
}

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false)
}