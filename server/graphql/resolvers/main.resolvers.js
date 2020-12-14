const postResolvers = require("./post.resolvers")
const userResolvers = require("./user.resolvers")

const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
}

module.exports = resolvers