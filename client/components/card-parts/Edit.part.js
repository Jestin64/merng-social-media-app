import React, {useState} from "react"
import { useMutation } from "@apollo/react-hooks"
import { Button, Form } from 'semantic-ui-react'
import gql from "graphql-tag"

const EDIT_POST = gql`
mutation editPost($postId: ID!){
    EditPost(postId: $postId){
        id
        body
        username
    }
}
`

export default function EditButton({post: {id}}){

    const [open, setOpen] = useState(true)
    const [commentBody, setCommentBody] = useState('')
    const [editPost] = useMutation(EDIT_POST, {
        variables:{
            postId: id
        }
    })

    function handleOnChange(e) {
        e.preventDefault()
        setCommentBody(e.target.value)
    }

    function handleEditClick(e){
        e.preventDefault()
        //editPost()
        console.log("edit post triggered")
    }
    
    return(
        <div>
            <Button 
                color="facebook"
                floated="left"
                onClick={()=>setOpen(!open)}
                style={{marginTop: "2px"}}
            > {open? 'Cancel': 'Edit Post'}
            </Button>
            {open && (
                <Form reply onSubmit={handleEditClick} >
                    <Form.TextArea value={commentBody} onChange={handleOnChange} />
                    <Button content='make change' labelPosition='left'  primary />
                </Form>
            )}
        </div>
    )
}