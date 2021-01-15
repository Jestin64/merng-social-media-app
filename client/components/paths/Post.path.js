// i)a post page with query of id that shows the card selected with its 
//ii)list of comments and 
//iii)a add comment form

//Error : message: "Variable "$postId" of type "ID!" used in position expecting type "String!"

import React, { useState, useContext } from 'react'
import gql from "graphql-tag"
import { Form, Button, Icon, Card } from 'semantic-ui-react'
import { useMutation, useQuery } from "@apollo/react-hooks"

import { AuthContext } from "../../context/auth.context"


const GETPOST = gql`
query getPost($postId: ID!){
    getPost(postId: $postId) {
        id
        username 
        body 
        createdAt 
        comments{
            id
            body
            username
            createdAt
        }
        likes{
            id
            username
            createdAt
        }
        countLikes
        countComments
    }
}
`

const POSTCOMMENT = gql`
mutation createPost(
    $body: String!
) {
    createPost(body: $body) {   
        id
        body
        username
        createdAt
    }
}
`

export default function Post(props) {
    const postId = props.match.params.postId
    const context = useContext(AuthContext)

    const {data, loading:post_loading, error:post_error } = useQuery(GETPOST,{
        variables:{
            postId
        }
    })
    
    if (data) {
        var { getPost: post } = data
    }
    if (post_error) {
        throw new Error(post_error)
    }

    const [body, setBody] = useState('')

    const [MakePost, { loading:comment_loading, error:comment_error }] = useMutation(POSTCOMMENT, {
        update(proxy, result) {
            console.log('postform result: ', result)
            setBody('')  // reset body field after making the post
        },
        variables: {
            body: body
        },
    })


    function handleOnChange(e) {
        e.preventDefault()
        setBody(e.target.value)
    }
 
    function handleSubmit(e) {
        e.preventDefault()
        MakePost()
    }

    return (
        <>
              {/* post body with meta data */}

              {/* form reply */}
              
              {/* list of comments */}
        </>
    )
}


