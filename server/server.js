const Mongoose = require("mongoose")
const {ApolloServer} = require("apollo-server")

const config = require("../config")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers/main.resolvers")


const server = new ApolloServer({typeDefs, resolvers})
Mongoose.connect(config.MONGO_URL, {useUnifiedTopology:true, useNewUrlParser:true})
    .then(()=>{
        console.log("connected to MongoDB")
    })
    .catch(err=>{
        console.error(err)
    })

server.listen(config.PORT, (err)=>{
    if(err) { return console.log(err)}
    console.log("Connected to Server: ", config.PORT)
})
