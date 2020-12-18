import React from "react"
import { Card, Image } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import moment from "moment"

import ButtonPart from "./card-parts/Button.part"
import CommentPart from "./card-parts/Comment.part"


function PostCard({ props: {id, body, username, createdAt, countLikes, countComments} }) {

    function likeOnPost(){}
    function commentOnPost(){}

    return (
        <div>
            <Card.Group style={{marginBottom:'10px'}}>
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
                        <ButtonPart props={countLikes} onClick={likeOnPost}/>
                        <CommentPart props={countComments} onClick={commentOnPost}/>
                    </Card.Content>

                </Card>
            </Card.Group>
        </div>
    )
}

export default PostCard