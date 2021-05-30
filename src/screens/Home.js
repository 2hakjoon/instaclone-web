import { useQuery } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import { Avatar } from "../components/Avatar";
import { FatText} from "../components/shared";

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

const PhotoContainer = styled.div`
    background-color: white;
    border:1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 20px;
    max-width: 615px;
    border-radius : 10px;
`

const PhotoHeader = styled.div`
    padding: 15px;
    display:flex;
    align-items: center;
`

const Username = styled(FatText)`
    margin-left:10px;
`

const PhotoFile = styled.img`
    width: 615px;
`
const PhotoData = styled.div`

`

const PhotoActions = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    div{
        display:flex;
        align-items:center;
    }

`

const PhotoAction = styled.div`
    margin-right: 10px;
`

const Likes = styled(FatText)`
    display : block;
    padding : 15px;
`

function Home () {
    const {data} = useQuery(FEED_QUERY,{variables:{pageNumber:1, pageSize:10}});
    console.log(data)
    return(
        <div>
            {data?.seeFeed?.map(photo =>{
                return(<PhotoContainer key={photo.id}>
                        <PhotoHeader>
                            <Avatar url={photo.user.avatar} lg/>
                            <Username>{photo.user.username}</Username>
                        </PhotoHeader>
                            <PhotoFile src={photo.file} />
                            <PhotoData>
                                <PhotoActions>
                                    <div>
                                        <PhotoAction><FontAwesomeIcon style={{color: (photo.isLiked? "tomato":"inherit")}} size={"2x"}icon={photo.isLiked ? SolidHeart : faHeart}/></PhotoAction>
                                        <PhotoAction><FontAwesomeIcon size={"2x"}icon={faComment}/></PhotoAction>
                                        <PhotoAction><FontAwesomeIcon size={"2x"}icon={faPaperPlane}/></PhotoAction>
                                    </div>
                                    <div>

                                    </div>
                                    <FontAwesomeIcon icon={faBookmark}/>
                                </PhotoActions>
                                <Likes>{photo.likes === 1? "1 like" : `${photo.likes} likes`}</Likes>
                            </PhotoData>
                    </PhotoContainer>)
                    }
            )}
            <button onClick={()=>logUserOut()}>Log out</button>
        </div>
    )
}

export default Home;