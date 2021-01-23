// a user profile page that has the username, totalposts, username
// 
// i) username change
// ii) password change

import React, { useContext, useState } from "react"
import {Button, Form, Label, Icon, Confirm } from "semantic-ui-react"
import { AuthContext } from "../../context/auth.context"


export default function Profile(){
    const [confirmDelete, setConfirmDelete] = useState(false)

    const {user} = useContext(AuthContext)
    const [editView, setEditView] = useState(false)


    function handleEditView(e){
        e.preventDefault()
        setEditView(!editView)
    }

    function handleDeleteAccount(e){
        e.preventDefault()
        console.log("delete account triggered")
    }


    return(

        <div className="profile" 
            style={{
                color: 'white',
                
            }}
        >
            <h3> username: {user.username} </h3>
            {editView && (
                <div className="profile-edit">
                    <Form>
                
                        <Form.Field >
                            <Form.Input placeholder="enter your new username" 
                                label="Username"
                                type="text"                               
                                name="username"                                
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder="enter your new password" 
                                label="Password"
                                type="password"                               
                                name="password"                                
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input placeholder="enter your new password again" 
                                label="Confirm Password"
                                type="password"                               
                                name="confirmPassword"                                
                            />
                        </Form.Field>

                    </Form>
                </div>
            )}
            <Button 
                color="teal"
                onClick = {handleEditView}
            > <Icon name="edit" style={{ margin: "0" }}/> {editView ? "cancel": "Edit Account"}
            </Button>

            <Button 
                color="red"
                onClick={()=>setConfirmDelete(true)}
            >
                <Icon name="user delete" style={{ margin: "0" }} /> Delete Account
            </Button>
            <Confirm 
                content="Are you sure you want to proceed?"
                open = {confirmDelete}
                onCancel= {()=>setConfirmDelete(false)}
                onConfirm= {handleDeleteAccount}
            />

        </div>

    )
}
