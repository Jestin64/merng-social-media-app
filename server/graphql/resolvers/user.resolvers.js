const bscript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const User = require("../../models/user.model")
const Post = require("../../models/post.model")
const { SECRET_KEY } = require("../../../config")
const { validateRegisterData, validateLogin } = require("../../controllers/validators")


function generateToken(res) {
    return (
        jwt.sign({
            id: res._id,
            username: res.username,
            email: res.email
        },
            SECRET_KEY,
            { expiresIn: '1h' })
    )

}

const userResolvers = {
    Query: {
        async getUsers(){
            try{
                const users = await User.find().sort({createdAt:-1})
                return users
            } catch(e){
                throw new Error(e)
            }
        }
    },

    Mutation: {
        async registerUser(_, { registerInput: { username, email, password, confirmPassword } }) {

            // user validation
            const { valid, errors } = validateRegisterData(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            // unique username
            const check = await User.findOne({ username })
            if (check) {
                throw new UserInputError("Oops, username is already taken :(", {
                    error: "Oops, username is already taken :("
                })
            }

            // password crypting and token gen
            password = await bscript.hash(password, 12)
            const new_user = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await new_user.save()
            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },


        async login(_, { username, password }) {
            const { valid, errors } = validateLogin(username, password)

            if (!valid) {
                throw new UserInputError("Error", { errors })
            }

            const user = await User.findOne({ username })
            if (!user) {
                errors.general = "User not found"
                throw new UserInputError("User not found", { errors })
            }

            const match = await bscript.compare(password, user.password)
            if (!match) {
                errors.general = "Incorrect Password"
                throw new UserInputError("Incorrect Password")
            }

            // console.log("logged in successfully")
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async deleteUser(_,{ userId: id }){
            try {
                const user = await User.findById(id)
                if (user) {
                    // delete all posts the user has 
                    const posts = await Post.find()  // retrieve all posts and loop through to find all posts made by the user and delete them
                    if(posts){
                        posts.map(post=>{
                            if(post.username === user.username){
                                post.delete()
                            }
                        })
                    }
                    user.delete()                   
                    return 'User Deleted'
                } else throw new Error("something went wrong")               
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}

module.exports = userResolvers