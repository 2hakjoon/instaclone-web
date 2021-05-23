import { useMutation } from "@apollo/client";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BottomBox } from "../components/auth/BottomBox";
import { Button } from "../components/auth/Button";
import { FormBox } from "../components/auth/FormBox";
import { FormError } from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import { Separator } from "../components/auth/Separator";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;



export const Login = () => {
    const { register, watch, handleSubmit, errors, formState, getValues, setError, clearErrors} = useForm({
        mode: "onChange",
    });

    const onCompleted = (data) => {
        const {login: {ok, error, token}} = data;
        if(!ok){
            setError("result",{
                type: "manual",
                message:error,
            })
        }
        if(token){
            logUserIn(token)
        }
    }
    const [login, { loading }] = useMutation(LOGIN_MUTATION,{
        onCompleted
    });

    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const { username, password } = getValues();
        login({
            variables: {
                username,
                password
            },
        });
    };

    const clearLoginError = () => clearErrors("result")
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("username", {
                            required: "Username should be longer than 5 chars",
                            minLength: {
                                value: 5,
                                message:
                                    "Username should be longer than 5 chars",
                            },
                        })}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}
                        onFocus={clearLoginError}
                    />
                    <FormError message={formState.errors?.username?.message} />

                    <Input
                        {...register("password", {
                            required: "password should be longer than 5 chars",
                            minLength: {
                                value: 5,
                                message:
                                    "password should be longer than 5 chars",
                            },
                        })}
                        type="password"
                        placeholder="Password"
                        hasError={formState.errors?.password?.message}
                        onFocus={clearLoginError}
                    />
                    <FormError message={formState.errors?.password?.message} />

                    <Button
                        type="submit"
                        value={loading? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading}
                    />
                    <FormError message={formState.errors?.result?.message} />
                </form>
                <Separator></Separator>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                link={routes.signUp}
                linkText="Sign Up"
            />
        </AuthLayout>
    );
};
