const Post = require("../../models/post.model")


const postResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch(err){
                return console.log(err)
            }
        }
    }
}

module.exports = postResolvers