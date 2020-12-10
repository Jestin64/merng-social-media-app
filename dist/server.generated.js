module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 6:0-14 */
/***/ ((module) => {

const config = {
  PORT: 3000,
  SECRET_KEY: 'GLORy to mankind',
  MONGO_URL: `mongodb+srv://AaronBaron:AaronBaron@cluster0.syfka.gcp.mongodb.net/social-media-app?retryWrites=true&w=majority`
};
module.exports = config;

/***/ }),

/***/ "./server/controllers/check-auth.js":
/*!******************************************!*\
  !*** ./server/controllers/check-auth.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 33:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  AuthenticationError
} = __webpack_require__(/*! apollo-server */ "apollo-server");

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const {
  SECRET_KEY
} = __webpack_require__(/*! ../../config */ "./config.js"); //token expression pattern: context.req.headers.authorization.Bearer Token 


function authCheck(context) {
  const auth = context.req.headers.authorization;

  if (auth) {
    const token = auth.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('invalid/expired token');
      }
    } else {
      throw new Error("Authentication Error");
    }
  } else {
    throw new Error("Authorization header must be provided");
  }
}

module.exports = authCheck;

/***/ }),

/***/ "./server/controllers/validators.js":
/*!******************************************!*\
  !*** ./server/controllers/validators.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 45:0-14 */
/***/ ((module) => {

//check for user correct data format
const validateRegisterData = (username, email, password, confirmPassword) => {
  let errors = {};
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (username.trim() === '') {
    errors.username = "Username cannot be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else if (!email.match(regEx)) {
    errors.email = "Please enter a valid email ";
  }

  if (password === '') {
    errors.password = "Passwords cannot be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors
  };
};

const validateLogin = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = "Username cannot be empty";
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors
  };
};

module.exports = {
  validateRegisterData,
  validateLogin
};

/***/ }),

/***/ "./server/graphql/resolvers/main.resolvers.js":
/*!****************************************************!*\
  !*** ./server/graphql/resolvers/main.resolvers.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const postResolvers = __webpack_require__(/*! ./post.resolvers */ "./server/graphql/resolvers/post.resolvers.js");

const userResolvers = __webpack_require__(/*! ./user.resolvers */ "./server/graphql/resolvers/user.resolvers.js");

const resolvers = {
  Query: { ...postResolvers.Query
  },
  Mutation: { ...userResolvers.Mutation,
    ...postResolvers.Mutation
  }
};
module.exports = resolvers;

/***/ }),

/***/ "./server/graphql/resolvers/post.resolvers.js":
/*!****************************************************!*\
  !*** ./server/graphql/resolvers/post.resolvers.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 129:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Post = __webpack_require__(/*! ../../models/post.model */ "./server/models/post.model.js");

const authCheck = __webpack_require__(/*! ../../controllers/check-auth */ "./server/controllers/check-auth.js");

const {
  AuthenticationError,
  UserInputError
} = __webpack_require__(/*! apollo-server */ "apollo-server");

const postResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({
          createdAt: -1
        });
        return posts;
      } catch (err) {
        return console.log(err);
      }
    },

    async getPost(_, {
      postId
    }) {
      if (postId.trim() === '') {
        throw new Error("please enter an id");
      } else {
        try {
          const post = await Post.findById(postId);
          if (post) return post;else throw new Error("Post not found! ;_; ");
        } catch (err) {
          throw new Error(err);
        }
      }
    }

  },
  Mutation: {
    async createPost(_, {
      body
    }, context) {
      const user = authCheck(context);
      if (body.trim === '') throw new Error('Post body cannot be empty');
      const new_post = await Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await new_post.save();
      return post;
    },

    async deletePost(_, {
      postId
    }, context) {
      const user = authCheck(context); //find the post first and validate that the user can delete only thier own posts!

      try {
        const post = await Post.findById(postId);

        if (post) {
          if (user.username === post.username) {
            post.delete();
            return 'Post Deleted';
          } else throw new AuthenticationError('Delete action on this post is not authorized');
        } else throw new Error("Oops Post not found");
      } catch (e) {
        throw new Error(e);
      }
    },

    async commentPost(_, {
      postId,
      body
    }, context) {
      const user = authCheck(context);
      if (body.trim() === '') throw new Error('Cannot post empty comment');

      try {
        const post = await Post.findById(postId);

        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString()
          });
          await post.save();
          return post;
        } else throw new Error("Post does not exist");
      } catch (e) {
        throw new Error(e);
      }
    },

    // TODO: deleteComment
    async deleteComment(_, {
      postId,
      commentId
    }, context) {
      const user = authCheck(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          const comment_index = post.comments.findIndex(comment => {
            if (comment.id == commentId) {
              return comment;
            }
          });

          if (user.username === post.comments[comment_index].username) {
            post.comments.splice(comment_index, 1);
            await post.save();
            return post;
          }
        } else throw new Error("Post does not exist");
      } catch (e) {
        throw new Error(e);
      }
    } //TODO: likes


  }
};
module.exports = postResolvers;

/***/ }),

/***/ "./server/graphql/resolvers/user.resolvers.js":
/*!****************************************************!*\
  !*** ./server/graphql/resolvers/user.resolvers.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 122:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const bscript = __webpack_require__(/*! bcryptjs */ "bcryptjs");

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const {
  UserInputError
} = __webpack_require__(/*! apollo-server */ "apollo-server");

const User = __webpack_require__(/*! ../../models/user.model */ "./server/models/user.model.js");

const {
  SECRET_KEY
} = __webpack_require__(/*! ../../../config */ "./config.js");

const {
  validateRegisterData,
  validateLogin
} = __webpack_require__(/*! ../../controllers/validators */ "./server/controllers/validators.js");

function generateToken(res) {
  return jwt.sign({
    id: res._id,
    username: res.username,
    email: res.email
  }, SECRET_KEY, {
    expiresIn: '1h'
  });
}

const userResolvers = {
  Mutation: {
    async register(_, {
      registerInput: {
        username,
        email,
        password,
        confirmPassword
      }
    }) {
      // user validation
      const {
        valid,
        errors
      } = validateRegisterData(username, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError('Errors', {
          errors
        });
      } // unique username(done)


      const check = await User.findOne({
        username
      });

      if (check) {
        throw new UserInputError("Oops, username is already taken :(", {
          error: "Oops, username is already taken :("
        });
      } // password crypting and token gen(done)


      password = await bscript.hash(password, 12);
      const new_user = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await new_user.save();
      const token = generateToken(res);
      return { ...res._doc,
        id: res._id,
        token
      };
    },

    async login(_, {
      username,
      password
    }) {
      const {
        valid,
        errors
      } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError("Error", {
          error
        });
      }

      const user = await User.findOne({
        username
      });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", {
          errors
        });
      }

      const match = await bscript.compare(password, user.password);

      if (!match) {
        errors.general = "Incorrect Password";
        throw new UserInputError("Incorrec Password");
      } // console.log("logged in successfully")


      const token = generateToken(user);
      return { ...user._doc,
        id: user._id,
        token
      };
    }

  }
};
module.exports = userResolvers;

/***/ }),

/***/ "./server/graphql/typeDefs.js":
/*!************************************!*\
  !*** ./server/graphql/typeDefs.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 58:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  gql
} = __webpack_require__(/*! apollo-server */ "apollo-server");

const typeDefs = gql`
    type Query{
        getPosts: [Post]!
        getPost(postId:String!): Post!
    }

    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like{
        id: ID!
        username: String!
        createdAt: String!
    }

    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        commentPost(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postID: ID!): Post!
    }
`;
module.exports = typeDefs;

/***/ }),

/***/ "./server/models/post.model.js":
/*!*************************************!*\
  !*** ./server/models/post.model.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 21:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [{
    body: String,
    username: String,
    createdAt: String
  }],
  likes: [{
    username: String,
    createdAt: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'users'
  }
});
module.exports = mongoose.model('Post', postSchema);

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String
});
module.exports = new mongoose.model("User", userSchema);

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const {
  ApolloServer
} = __webpack_require__(/*! apollo-server */ "apollo-server");

const config = __webpack_require__(/*! ../config */ "./config.js");

const typeDefs = __webpack_require__(/*! ./graphql/typeDefs */ "./server/graphql/typeDefs.js");

const resolvers = __webpack_require__(/*! ./graphql/resolvers/main.resolvers */ "./server/graphql/resolvers/main.resolvers.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    req
  }) => ({
    req
  })
});
Mongoose.connect(config.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("connected to MongoDB");
}).catch(err => {
  console.error(err);
});
server.listen(config.PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log("Connected to Server: ", config.PORT);
});

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("apollo-server");;

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./server/server.js");
/******/ })()
;