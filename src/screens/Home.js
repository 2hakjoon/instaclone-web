import { isLoggedInVar, logUserOut } from "../apollo";

function Home () {
    return(
        <div>
            <h1>Home</h1>
            <button onClick={()=>logUserOut()}>Log out</button>
        </div>
    )
}

export default Home;