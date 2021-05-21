import styled from "styled-components"
import { isLoggedInVar } from "../apollo"

const Container = styled.div`

`

export const Login = () => {
    return (
        <Container>
            <div>
                <div>
                    <h1>Instagram</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <input type="submit" placeholder="Log in"/>
                    </form>
                    <span>Or</span>
                    <span>Log in with Facebook</span>
                </div>
                <div>
                    <span>Don't have an account?</span> <a href="#">Sign up</a>
                </div>
            </div>
        </Container>
    )
}