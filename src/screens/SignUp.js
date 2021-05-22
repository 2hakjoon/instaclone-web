import {
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BottomBox } from "../components/auth/BottomBox";
import { Button } from "../components/auth/Button";
import { FormBox } from "../components/auth/FormBox";
import { Input } from "../components/auth/Input";
import { Separator } from "../components/auth/Separator";
import { PageTitle } from "../components/PageTitle";
import { FatLink } from "../components/shared";
import { routes } from "../routes";


const HeaderContainder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const Subtitle = styled(FatLink)`
    font-size: 16px;
    width: 70%;
    text-align: center;
    margin-top : 10px;
`



export const SignUp = () => {
    return (
        <AuthLayout>
            
            <PageTitle title ="SignUp"/>
            <FormBox>
                <HeaderContainder>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>Sign up to see photos and videos from your friends</Subtitle>
                </HeaderContainder>
                <form>
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Log in" />
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
};
