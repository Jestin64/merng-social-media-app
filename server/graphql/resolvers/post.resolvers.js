const Post = require("../../models/post.model")
const authCheck = require("../../controllers/check-auth")


const postResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (err) {
                return console.log(err)
            }
        },

        async getPost(id) {
            try {
                const post = await Post.findOne({ id })
                if (post) return post 
                else throw new Error("Post not found! ;_; ")
            } catch (err) { throw new Error(err) }
        }
    },

    Mutation:{
        async createPost(_, {body}, context){
            const user = authCheck(context)

            if(body.trim === ''){
                throw new Error('Post body cannot be empty')
            }
            
            const new_post = await Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await new_post.save()
            return post
        }   
    }
}

module.exports = postResolvers