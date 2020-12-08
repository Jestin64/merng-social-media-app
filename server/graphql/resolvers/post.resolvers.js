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
        },

        async getPost(id){
            try{
                const post = await Post.findOne({id})
                if(!post){
                    throw new Error("Post not found! ;_; ") 
                }else{
                    return post
                }
            } catch(err) { throw new Error(err)}
        }
    }
}

module.exports = postResolvers