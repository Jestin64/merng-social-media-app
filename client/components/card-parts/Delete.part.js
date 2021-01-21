// used in PostCard component

import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { Button, Icon, Label, Confirm } from "semantic-ui-react"
import gql from "graphql-tag"


const DELETE_POST = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`
const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId) {
        id
        body
        username
        createdAt
        countLikes
        countComments
        likes { id createdAt username }
        comments { id createdAt username body }
    }
}
`

function DeleteButton({post: {id}, postOrComment, commentId='default_placeholder'}) {
    //delete post part
    const [deletePost] = useMutation(DELETE_POST,{
        onError(err){
            throw new Error(err)
        },
        variables:{
            postId: id
        }
    })
    function HandleDeletePost(e) {
        e.preventDefault()
        deletePost() 
        window.location.reload()
    }

    // delete comment part
    const [deleteComment] = useMutation(DELETE_COMMENT,{
        onError(err){
            throw new Error(err)
        },
        variables:{
            postId: id,
            commentId: commentId
        }
    })
    function HandleDeleteComment(e){
        e.preventDefault()
        deleteComment() 
    }


    return (
        <div>
            <Button
                color="red"
                floated="left"
                onClick={postOrComment ? HandleDeletePost: HandleDeleteComment}
            >
                <Icon name="trash" style={{ margin: "0" }} />
            </Button>
        </div>
    )
}

export default DeleteButton
