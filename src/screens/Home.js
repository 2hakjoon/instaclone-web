import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import { Avatar } from "../components/Avatar";
import { FatText } from "../components/shared";

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
        }
    }
`

const PhotoContainer = styled.div`
    background-color: white;
    border:1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
`

const PhotoHeader = styled.div`
    padding:5px;
    display:flex;
    align-items: center;
`

const Username = styled(FatText)`
    margin-left:10px;
`


function Home () {
    const {data} = useQuery(FEED_QUERY,{variables:{pageNumber:1, pageSize:5}});
    console.log(data)
    return(
        <div>
            {data?.seeFeed?.map(photo =>{
                return(<PhotoContainer key={photo.id}>
                        <PhotoHeader>
                            <Avatar url={photo.user.avatar}/>
                            <Username>{photo.user.username}</Username>
                        </PhotoHeader>
                    </PhotoContainer>)
                    }
            )}
            <button onClick={()=>logUserOut()}>Log out</button>
        </div>
    )
}

export default Home;