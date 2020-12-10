const bscript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const User = require("../../models/user.model")
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
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }) {

            // user validation
            const { valid, errors } = validateRegisterData(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            // unique username(done)
            const check = await User.findOne({ username })
            if (check) {
                throw new UserInputError("Oops, username is already taken :(", {
                    error: "Oops, username is already taken :("
                })
            }

            // password crypting and token gen(done)
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
                throw new UserInputError("Error", { error })
            }

            const user = await User.findOne({ username })
            if (!user) {
                errors.general = "User not found"
                throw new UserInputError("User not found", { errors })
            }

            const match = await bscript.compare(password, user.password)
            if (!match) {
                errors.general = "Incorrect Password"
                throw new UserInputError("Incorrec Password")
            }

            // console.log("logged in successfully")
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}

module.exports = userResolvers