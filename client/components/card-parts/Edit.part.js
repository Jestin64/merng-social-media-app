import React, {useState} from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, Form, Confirm, Input } from 'semantic-ui-react'
import gql from "graphql-tag"

const EDIT_POST = gql`
mutation editPost($postId: ID!, $body: String!){
    editPost(postId: $postId, body: $body){
        id
        body
        username
    }
}
`

export default function EditButton({post: {id}}){

    const [open, setOpen] = useState(false)
    const [body, setBody] = useState('')
    const [editPost, {loading, error}] = useMutation(EDIT_POST, {
        variables:{
            postId: id,
            body: body
        }
    })

    function handleOnChange(e) {
        e.preventDefault()
        setBody(e.target.value)
    }

    function handleEditClick(e){
        e.preventDefault()
        editPost()
        setOpen(false)
    }

    function textField(){
       return (
        <Input 
            placeholder="enter here"
            loading={loading}
            focus
            onChange={handleOnChange} 
            style={{width: '100%'}}
        />
       ) 
    }
    
    return(
        <div className="edit-post">

            <Button 
                color="facebook"
                floated="left"
                onClick = {()=>setOpen(true)}
                style={{marginTop: "4px", marginBottom: "4px",}}
            > Edit post
            </Button>

            <Confirm
                content={textField}
                header='Edit your post'
                open={open}
                onCancel={()=>setOpen(false)}
                onConfirm={handleEditClick}
            />

        </div>
    )
}