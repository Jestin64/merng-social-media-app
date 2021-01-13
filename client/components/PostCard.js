import React, { useContext, } from "react"
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import moment from "moment"

import LikePart from "./card-parts/Like.part"
import CommentPart from "./card-parts/Comment.part"
import { AuthContext } from "../context/auth.context"


function PostCard({ post: { id, body, username, likes, comments, createdAt, countLikes, countComments } }) {
    const {user} = useContext(AuthContext)
    
    function deletePost() {
        console.log("delete post")
    }

    return (
        <div>
            <Card.Group style={{ marginBottom: '3%' }}>
                <Card>
                    {/* post body */}
                    <Card.Content>
                        <Image floated='right' size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description as={Link} to={`/posts/${id}`}>
                            {body}
                        </Card.Description>
                    </Card.Content>

                    {/* likebutton and commentbutton*/}
                    <Card.Content extra >
                        <>
                            <LikePart
                                user={user}
                                post={{id, likes, countLikes}}
                            />
                            <CommentPart
                                user={user}
                                post={{id, countComments}}
                            />
                        </>

                    {/* delete button only if the user is logged in and should render only if 
                    its the currently logged in user's post */}
                        {user && user.username === username && (
                            <Button
                                color="red"
                                floated="right"
                                onClick={deletePost}    
                            >
                                <Icon name="trash" style={{margin:"0"}}/> 
                            </Button>
                        )}
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}

export default PostCard