import React, { useContext, useEffect, useState } from 'react'
import gql from "graphql-tag"
import { Grid, Transition, Pagination } from 'semantic-ui-react'
import { useQuery } from "@apollo/react-hooks"

import { AuthContext } from "../../context/auth.context.js"
import PostCard from "../PostCard.js"
import PostForm from "../PostForm.js"


const FETCH_POSTS = gql`
{
    getPosts{
      id
      username
      body
      comments {
        id
        body
        username
      }
      likes {
        username
      }
      countLikes
      countComments
    }
}
`

function Home() {
    const user = useContext(AuthContext)
    
    const { loading, error, data } = useQuery(FETCH_POSTS)
    if (data) {
        var {getPosts: posts} = data  // destructure the data part like this else you will get a unfound variable error  
    }
    if (error) {
        throw new Error(error)
    }

    //variables for pagination
    const postsPerPage = 3
    const start = 0

    return (

        <div className="home" >
            <div className="ui container">
                <Transition.Group >
                    <Grid columns={2}>
                        <Grid.Row className="grid-row-header">
                            <h2>Recent Posts</h2>
                        </Grid.Row>
                        <Grid.Row>
                            {/* check is user is logged in and if so add a post form  
                        make grid column with the postform component inside it
                    */
                                user && (
                                    <Grid.Column >
                                        <PostForm />
                                    </Grid.Column>
                                )
                            }
                            {
                                 loading
                                    ? <h3>loading...</h3>
                                    : 
                                    posts && posts.slice(start, start+postsPerPage).map(post => {
                                        return (
                                            <Grid.Column key={post.id}>
                                                <PostCard
                                                    post={post}
                                                />
                                            </Grid.Column>
                                        )
                                    })                                                                                                                                                                
                            }
                        </Grid.Row>
                    </Grid>
                </Transition.Group>
            </div>
            <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={posts? Math.ceil(posts.length/postsPerPage): 1 }  //posts can be undefined at the start
                
            />
        </div>
    )
}

export default Home 