const User = require("../../models/user.model")
const bscript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../../../config")


const userResolvers = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }) {

            password = await bscript.hash(password, 12)

            const new_user = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await new_user.save()

            const token = jwt.sign({
                id: res._id,
                username: res.username,
                email: res.email
            }, SECRET_KEY, { expiresIn: '1h' })

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

module.exports = userResolvers