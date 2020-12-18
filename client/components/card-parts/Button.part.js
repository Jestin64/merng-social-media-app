import React from "react"
import { Button, Icon, Label } from "semantic-ui-react"

function ButtonPart({ props: countLikes }) {

    const likeOnPost = ()=>{
        console.log("post liked")
    }

    return (
        <Button as="div" labelPosition="right" >
            <Button color="teal" basic onClick={likeOnPost}>
                <Icon name="thumbs up outline" />
                    Like
            </Button>
            <Label as="a" basic color="teal" pointing="left">
                {countLikes}
            </Label>
        </Button>
    )
}

export default ButtonPart