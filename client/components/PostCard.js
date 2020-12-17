import React from "react"
import { Button, Card, Image } from 'semantic-ui-react'
import moment from "moment"

function PostCard({ props: { body, username, createdAt, comments, likes, commentCount, likeCount } }) {
    return (
        <div>
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description>
                            {body}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra >
                        <p>button placeholder</p>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}

export default PostCard