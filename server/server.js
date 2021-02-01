const Mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server")

const config = require("../config")
const typeDefs = require("./graphql/typeDefs.js")
const resolvers = require("./graphql/resolvers/main.resolvers.js")

const PORT = config.PORT || 5000
const URI = config.MONGO_URL

const server = new ApolloServer({   
    typeDefs, 
    resolvers,
    context: ({ req }) => ({req})
})

Mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch(err => {
        console.error(err)
    })

server.listen(PORT, (err) => {
    if (err) { return console.log(err) }
    console.log("Connected to Server on port: ", PORT)
})