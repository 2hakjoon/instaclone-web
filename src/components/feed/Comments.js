import PropTypes from "prop-types"
import styled from "styled-components";
import { FatText } from "../shared";
import { Comment } from "./Comment";



const CommentsContainer = styled.div`
    padding: 15px;
`;


const CommentCount = styled.span`
    opacity:0.7;
    margin: 10px 0px;
    display: block;
    font-size : 12px;
`

export const Comments = ({author, caption, totalComments, comments}) => {
    return(
        <CommentsContainer>
        <Comment author={author} payload={caption}/>
        <CommentCount>{totalComments === 1 ? "1 comment" : `${totalComments} comments`}</CommentCount>
        {comments?.map(comment => <Comment key={comment.id} author={comment.user.username} payload={comment.payload} />)}
        </CommentsContainer>
    )

}



Comments.propTypes = {
    author:PropTypes.string.isRequired,
    caption:PropTypes.string,
    totalComments:PropTypes.number.isRequired,
    comments:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired,
        user:PropTypes.shape({
            avatar:PropTypes.string.isRequired,
            username:PropTypes.string.isRequired,
        }),
        payload:PropTypes.bool.isRequired,
        isMine:PropTypes.bool.isRequired,
        createdAt:PropTypes.string.isRequired,
    }))

}