import React from 'react'
import { Button, Form, Card } from 'semantic-ui-react'
import { Link } from "react-router-dom"


function Login() {
    return (
        <div className="ui center aligned column grid">
            <Card style={{
                backgroundColor: "#02cec4",
                marginTop: "40px",
                padding: "10px",
            }}>
                <Card.Header style={{
                    marginBottom: "30px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    border: "1px",
                    color: "white",
                    fontSize: "25px"
                }}>Login</Card.Header>

                <Card.Content>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder="enter your username" />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder="enter your password" />
                        </Form.Field>
                        <Button type="submit">Sign In</Button>
                    </Form>
                </Card.Content>

                <Card.Description style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                }} 
                as={Link}
                to = '/register'                 
                >no account? register here
                </Card.Description>
            </Card>
        </div>
    )
}

export default Login