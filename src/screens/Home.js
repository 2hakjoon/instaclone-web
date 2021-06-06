import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {logUserOut } from "../apollo";
import { Photo } from "../components/feed/Photo";
import { PageTitle } from "../components/PageTitle";

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
                user{
                    username
                    avatar
                }
                payload
                isMine
                createdAt
            }
            createdAt
            isMine
            isLiked
            totalComments
        }
    }
`
function Home () {
    const {data} = useQuery(FEED_QUERY,{variables:{pageNumber:1, pageSize:10}});
    return(
    <div>
        <PageTitle title="Home"/>
        {data?.seeFeed?.map(photo =><Photo key={photo.id} {...photo}/>)}
        <button onClick={()=>logUserOut()}>Log out</button>

    </div>
    )
}

export default Home;