import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import gql from "graphql-tag"


const DELETEPOST = gql`
mutation deleteComment($postId: ID!){
    deleteComment(postId: $postId)
}
`

function DeleteButton({post: {id}, user}) {
    const [deletePost] = useMutation(DELETEPOST,{
        onError(err){
            throw new Error(err)
        },
        variables:{
            postId: id
        }
    })


    function HandleDelete(e) {
        e.preventDefault()
        console.log("delete post triggered")
        deletePost()
    }

    return (
        <div>
            <Button
                color="red"
                floated="right"
                onClick={HandleDelete}
            >
                <Icon name="trash" style={{ margin: "0" }} />
            </Button>
        </div>
    )
}

export default DeleteButton
