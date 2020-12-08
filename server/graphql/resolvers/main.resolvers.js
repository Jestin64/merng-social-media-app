const postResolvers = require("./post.resolvers")
const userResolvers = require("./user.resolvers")

const resolvers = {
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation
    }
}

module.exports = resolvers