import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";


const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id:Int!){
        deleteComment(id:$id){
            ok
        }
    }
`


const CommentContainer = styled.div``;

const CommentCaption = styled.span`
    margin-left : 10px;
    a{
        background-color: inherit;
        color:${(props) => props.theme.accent};
        cursor:pointer;
        :hover{
            text-decoration: underline;
        }
    }
`;



export const Comment = ({author, photoId, id, isMine, payload}) => {
    const updateDeleteComment = (cache, result) => {
        const {data:{deleteComment:{ok, error}}} = result;
        if(ok){
            cache.evict({id:`Comment:${id}`});
            cache.modify({
                id:`Photo:${photoId}`,
                fields: {
                    totalComments(prev){
                        return prev - 1;
                    }
                }
            })
        }
    }
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables:{
            id,
        },
        update:updateDeleteComment,
    })

    const onDeleteClick = () => {
        deleteCommentMutation();
    }
    return (
        <CommentContainer>
            <Link to={`/users/${author}`}>{author}</Link>
            <CommentCaption>
                {payload.split(" ").map((word, index) =>
                    /#[\w]+/.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>
                                {word}
                            </Link>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>{word}
                        {" "}
                        </React.Fragment>
                    )
                )}
            </CommentCaption>
            {isMine ? <button onClick={onDeleteClick}>X</button> : null}
        </CommentContainer>
    );

}

Comment.propTypes = {
    isMine:PropTypes.bool,
    id:PropTypes.number,
    photoId:PropTypes.number,
    author:PropTypes.string.isRequired,
    payload:PropTypes.string.isRequired
}