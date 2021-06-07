import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {logUserOut } from "../apollo";
import { Photo } from "../components/feed/Photo";
import { PageTitle } from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";

const FEED_QUERY = gql`
    query seeFeed($pageNumber: Int!, $pageSize: Int!) {
        seeFeed(pageNumber:$pageNumber, pageSize:$pageSize){
            ...PhotoFragment
            user{
                username
                avatar
            }
            caption
            comments{
                ...CommentFragment
            }
            
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
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