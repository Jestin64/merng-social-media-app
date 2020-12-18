import React from 'react'
import { Button, Form, Card } from "semantic-ui-react";

function Register() {
    return (
        <div className="ui center aligned column grid">
            <Card style={{
                backgroundColor: "#03a5c1",
                marginTop: "40px",
                padding: "5px",
            }}>
                <Card.Header style={{
                    marginBottom: "30px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    border: "1px",
                    color: "white",
                    fontSize: "25px",
                }}>Register</Card.Header>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder="enter your username" />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder="enter your email" />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder="enter your password" />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm password</label>
                            <input placeholder="enter your password again" />
                        </Form.Field>

                        <Button type="submit"> Register </Button>

                    </Form>
                </Card.Content>
            </Card>

        </div>
    )
}

export default Register