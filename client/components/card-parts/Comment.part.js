import React from "react"
import { Button, Icon, Label } from "semantic-ui-react"


function CommentPart({props: countComments}) {

    const commentOnPost = ()=>{
        console.log("post commented")
    }
    
    return (

        <Button as="div" labelPosition="right" >
            <Button color="teal" basic onClick={commentOnPost}>
                <Icon name="comment outline" />
                    comment
            </Button>
            <Label as="a" basic color="teal" pointing="left">
                {countComments}
            </Label>
        </Button>

    )
}

export default CommentPart