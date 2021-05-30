import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {logUserOut } from "../apollo";
import { Photo } from "../components/feed/Photo";

const FEED_QUERY = gql`
    query seeFeed($pageNumber: Int!, $pageSize: Int!) {
        seeFeed(pageNumber:$pageNumber, pageSize:$pageSize){
            id
            user{
                username
                avatar
            }
            file
            caption
            likes
            comments{
                id
            }
            createdAt
            isMine
            isLiked
        }
    }
`
function Home () {
    const {data} = useQuery(FEED_QUERY,{variables:{pageNumber:1, pageSize:10}});
    return(
    <div>
        {data?.seeFeed?.map(photo =><Photo key={photo.id} {...photo}/>)}
        <button onClick={()=>logUserOut()}>Log out</button>
    </div>
    )
}

export default Home;