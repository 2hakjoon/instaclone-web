import styled from "styled-components"
import { Header } from "./components/Header"

const Content = styled.div`
    max-width: 930px;
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
`

export const Layout=({children})=>{
    return(
        <>
        <Header/>
        <Content>
        {children}
        </Content>
        </>
        )
}