const { ApolloServer, gql } = require("apollo-server")
const Mongoose = require("mongoose")

const config = require("./config.js")
const Post = require("./models/Post.model")


const typeDefs = gql(`
    type Query{
        getPosts: [Post]
    }

    type Post {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }
`)

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (err) {throw new Error(err)}   
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

Mongoose.Promise = global.Promise
Mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch(e => {
        console.error("Unable to connect to MongoDB server: ", e)
    })

server.listen(config.PORT, err => {
    if (err) return `unable to conn ect to port ${config.PORT}`
    console.log(`Connected to Server on port: ${config.PORT}`)
})