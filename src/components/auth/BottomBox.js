import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        color: ${(props) => props.theme.accent};
        text-decoration: none;
        margin-left: 5px;
    }
`

export const BottomBox = ({cta, link, linkText}) => {
    return(
        <Container>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </Container>
    )
}