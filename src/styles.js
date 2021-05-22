import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095F6",
    borderColor: "rgb(219, 219, 219)"
}


export const GlobalStyles = createGlobalStyle`
    ${reset}
    input{
        all:unset;
    }
    *{
        box-sizing:border-box;
    }
    body{
        background-color: #FAFAFA;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color:rgb(38,38,38)
    }
`
