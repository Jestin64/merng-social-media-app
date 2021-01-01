import React from 'react'
import { Button, Form, Card, CardContent } from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom"
import {useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"


const LOGIN_USER = gql`
mutation LoginUser(
    $username: String!
    $password: String!
) {
    login(username: $username, password: $password){
        id
        email
        username
        token 
        createdAt
    }
}
`

function Login() {
    let history = useHistory()
    const [values, setValues] = React.useState({
        username:'',
        password:''
    })

    const [errors ,setErrors] = React.useState({})
    // console.log("login: ",errors)
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, result){
            console.log(result.data.login)
            history.push('/')
        },  
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            password: values.password
        }
    })

    const handleOnChange =(e)=>{
        e.preventDefault()
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        loginUser()
    }

    return (
        <div className="ui center aligned column grid">
            <Card className="card-login">
                <Card.Header className="card-login-header">Login</Card.Header>
                <Card.Content>
                    <Form onSubmit={handleSubmit} className={loading ? 'loading': ''}>
                        <Form.Field >                           
                            <Form.Input placeholder="enter your username" 
                                label="Username"
                                name="username"
                                type="text"                                             
                                value={values.username}
                                error={errors.username? true:false}
                                onChange={handleOnChange}
                            />
                        </Form.Field>
                        <Form.Field >
                            <Form.Input placeholder="enter your password"
                                label="Password"
                                name="password"
                                type="password"  
                                error={errors.password? true:false}          
                                value={values.password}
                                onChange={handleOnChange}
                            />
                        </Form.Field>
                        <Button type="submit">Sign In</Button>
                    </Form>

                </Card.Content>

                <Card.Description className="card-description" 
                as={Link}
                to = '/register'                 
                >no account? register here
                </Card.Description>
                {
                        Object.keys(errors).length > 0 && (
                            <div className="ui error message">
                                <ul className="">
                                    {
                                        Object.values(errors).map(e_val=>{
                                            return(
                                                <li key={e_val}>{e_val}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )                  
                    }
            </Card>
        </div>
    )
}

export default Login