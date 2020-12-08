const {gql} = require("apollo-server")

const typeDefs = gql`
    type Query{
        getPosts: [Post]
    }

    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
    }
`

module.exports = typeDefs