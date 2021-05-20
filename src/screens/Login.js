import { isLoggedInVar } from "../apollo"

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={()=>isLoggedInVar(true)}>Log in</button>
        </div>
    )
}