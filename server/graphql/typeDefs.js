const {gql} = require("apollo-server")

const typeDefs = gql`
    type Query{
        getPosts: [Post]!
        getPost(postId:String!): Post!
    }

    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like{
        id: ID!
        username: String!
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
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        commentPost(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`

module.exports = typeDefs