import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
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
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    width: 70%;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String!
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ){
            ok
            error
        }
    }
`;

export const SignUp = () => {
    const history = useHistory()
    const onCompleted = (data) =>{
        const {username, password} = getValues();
        const {createAccount:{ok, error}} = data;
        if(!ok){
            return;
        }
        history.push(routes.home, {message:"New account is created. Please log in.", username, password})
    }
    const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{onCompleted})
    const { register, handleSubmit, errors, formState, getValues } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        createAccount({
            variables:{
                ...data,
            }
        })
    };
    return (
        <AuthLayout>
            <PageTitle title="SignUp" />
            <FormBox>
                <HeaderContainder>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends
                    </Subtitle>
                </HeaderContainder>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("firstName", { required: "First Name is required" })}
                        type="text"
                        placeholder="First Name"
                    />
                    <Input
                        {...register("lastName", { required: "Last Name is required" })}
                        type="text"
                        placeholder="Last Name"
                    />
                    <Input
                        {...register("email", { required: "Email is required" })}
                        type="text"
                        placeholder="Email"
                    />
                    <Input
                        {...register("username", { required: "Username is required" })}
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                link={routes.home}
                linkText="Log in"
            />
        </AuthLayout>
    );
};
