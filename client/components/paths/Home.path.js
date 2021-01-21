import React, { useContext,useEffect } from 'react'
import gql from "graphql-tag"
import { Grid, Transition } from 'semantic-ui-react'
import { AuthContext } from "../../context/auth.context"
import { useQuery } from "@apollo/react-hooks"
import PostCard from "../PostCard"
import PostForm from "../PostForm"


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
    const user = useContext(AuthContext)
    const { loading, error, data } = useQuery(FETCH_POSTS)
    if (data) {
        var { getPosts: posts } = data // destructure the data part like this else you will get a unfound variable error
    }
    if (error) {
        throw new Error(error)
    }

    return (
        <div className="home">
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
                                    : posts && posts.map(post => {
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
        </div>
    )
}

export default Home