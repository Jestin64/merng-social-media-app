import React from 'react'
import gql from "graphql-tag"
import { Grid } from 'semantic-ui-react'
import { useQuery } from "@apollo/react-hooks"

import PostCard from "../PostCard"

const FETCH_POSTS = gql`
{
    getPosts {
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
    const { loading, error, data:{getPosts: posts} } = useQuery(FETCH_POSTS)
    if (error) {
        throw new Error(error)
    }

    return (
        <div>
            <Grid columns={1}>
                <Grid.Row>
                    <h2>Recent Posts</h2>
                </Grid.Row>
                <Grid.Row>
                    {
                        loading
                        ?<h3>loading...</h3>
                        : posts && posts.map(post => {
                            return(
                                <Grid.Column >
                                    <PostCard 
                                        key={post.id}
                                        props={post}
                                    />
                                </Grid.Column>
                            )
                        })
                    }
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Home