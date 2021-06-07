import { useMutation } from "@apollo/client";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import PropTypes from "prop-types"
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";
import { FatText } from "../shared";
import { Comment } from "./Comment";


const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId:Int!, $payload: String!){
        createComment(photoId:$photoId, payload: $payload){
            ok
            error
        }
    }
`


const CommentsContainer = styled.div`
    padding: 15px;
`;


const CommentCount = styled.span`
    opacity:0.7;
    margin: 10px 0px;
    display: block;
    font-size : 12px;
`

export const Comments = ({photoId, author, caption, totalComments, comments}) => {
    const {data:userData} = useUser();
    const createCommentUpdate = (cache, result) => {
        const {data: {createComment:{ok, id}}} = result;
        if(ok && userData?.me){
            const {payload} = getValues()
            setValue("payload", "");
            const newComment = {
                __typename:"Comment",
                createdAt:Date.now(),
                id,
                isMine:true,
                payload,
                user:{
                    ...userData.me
                }
            }
            cache.modify({
                id:`Photo:${photoId}`,
                fields:{
                    comments(prev){
                        return [...prev, newComment];
                    }
                }
            })
        }
    }

    const [createCommentMutation, {loading}] = useMutation(CREATE_COMMENT_MUTATION, {
        update:createCommentUpdate,
    });
    const {register, handleSubmit, setValue, getValues} = useForm();
    const onVaild = (data) => {
        console.log(data)
        const {payload} = data;
        if(loading){
            return;
        }
        createCommentMutation({
            variables:{
                photoId,
                payload,
            }
        });
    }
    return(
        <CommentsContainer>
            <Comment author={author} payload={caption}/>
            <CommentCount>{totalComments === 1 ? "1 comment" : `${totalComments} comments`}</CommentCount>
            {comments?.map(comment => <Comment key={comment.id} id={comment.id} photoId = {photoId} author={comment.user.username} payload={comment.payload} isMine={comment.isMine} />)}
            <div>
                <form onSubmit={handleSubmit(onVaild)}>
                    <input {...register("payload", { required: true })} type="text" placeholder="Write a comment"/>
                </form>
            </div>
        </CommentsContainer>
    )

}



Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
    author:PropTypes.string.isRequired,
    caption:PropTypes.string,
    totalComments:PropTypes.number.isRequired,
    comments:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired,
        user:PropTypes.shape({
            avatar:PropTypes.string.isRequired,
            username:PropTypes.string.isRequired,
        }),
        payload:PropTypes.string.isRequired,
        isMine:PropTypes.bool.isRequired,
        createdAt:PropTypes.string.isRequired,
    }))

}