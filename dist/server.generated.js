module.exports=(()=>{var t={636:e=>{e.exports={PORT:3e3,SECRET_KEY:"GLORy to mankind",MONGO_URL:"mongodb+srv://AaronBaron:AaronBaron@cluster0.syfka.gcp.mongodb.net/social-media-test?retryWrites=true&w=majority"}},266:(e,t,r)=>{const{AuthenticationError:n}=r(262),s=r(722),{SECRET_KEY:o}=r(636);e.exports=function(e){const t=e.req.headers.authorization;if(!t)throw new Error("Authorization header must be provided");{const e=t.split("Bearer ")[1];if(!e)throw new Error("Authentication Error");try{return s.verify(e,o)}catch(e){throw new n("invalid/expired token")}}}},919:e=>{e.exports={validateRegisterData:(e,t,r,n)=>{let s={};return""===e.trim()&&(s.username="Username cannot be empty"),""===t.trim()?s.email="Email cannot be empty":t.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)||(s.email="Please enter a valid email "),""===r?s.password="Passwords cannot be empty":r!==n&&(s.password="Passwords must match"),{valid:Object.keys(s).length<1,errors:s}},validateLogin:(e,t)=>{const r={};return""===e.trim()&&(r.username="Username cannot be empty"),""===t&&(r.password="Password cannot be empty"),{valid:Object.keys(r).length<1,errors:r}}}},991:(e,t,r)=>{const n=r(366),s=r(10),o={Post:{countLikes:e=>e.likes.length,countComments:e=>e.comments.length},Query:{...s.Query,...n.Query},Mutation:{...s.Mutation,...n.Mutation}};e.exports=o},366:(t,r,n)=>{const s=n(804),o=n(266),{AuthenticationError:a,UserInputError:i}=n(262),d={Query:{async getPosts(){try{return await s.find().sort({createdAt:-1})}catch(e){throw new Error(e)}},async getPost(e,{postId:t}){if(""===t.trim())throw new Error("please enter an id");try{const e=await s.findById(t);if(e)return e;throw new Error("Post not found!")}catch(e){throw new Error(e)}}},Mutation:{async createPost(e,{body:t},r){const n=o(r);if(""===t.trim())throw new i("Post body cannot be empty");const a=await s({body:t,user:n.id,username:n.username,createdAt:(new Date).toISOString()});return await a.save()},async editPost(e,{postId:t,body:r}){if(""===r.trim())throw new i("Post body cannot be empty");const n=await s.findById(t);if(n)return n.body=r,n.save(),n},async deletePost(e,{postId:t},r){const n=o(r);try{const e=await s.findById(t);if(e){if(n.username===e.username)return e.delete(),"Post Deleted";throw new a("Delete action on this post is not authorized")}throw new Error("Oops Post not found")}catch(e){throw new Error(e)}},async commentPost(e,{postId:t,body:r},n){const a=o(n);if(""===r.trim())throw new Error("Cannot post empty comment");try{const e=await s.findById(t);if(e)return e.comments.unshift({body:r,username:a.username,createdAt:(new Date).toISOString()}),await e.save(),e;throw new Error("Post does not exist")}catch(e){throw new Error(e)}},async editComment(e,{postId:t,commentId:r,body:n},a){if(o(a),""===n.trim())throw new Error("Cannot post empty comment");try{const e=await s.findById(t);return e&&e.comments.map((e=>{e.id===r&&(e.body=n)})),e.save(),e}catch(e){throw new Error(e)}},async deleteComment(e,{postId:t,commentId:r},n){const a=o(n);try{const e=await s.findById(t);if(!e)throw new Error("Post does not exist");{const t=e.comments.findIndex((e=>{if(e.id==r)return e}));if(a.username===e.comments[t].username)return e.comments.splice(t,1),await e.save(),e}}catch(e){throw new Error(e)}},async likePost(t,{postId:r},n){const a=o(n);try{const t=await s.findById(r);if(t)return t.likes.find((e=>e.username===a.username))?t.likes=t.likes.filter((e=>e.username!==a.username)):t.likes.push({username:a.username,createdAt:(new Date).toISOString()}),await t.save(),t;throw new Error(e)}catch(e){throw new Error(e)}}}};t.exports=d},10:(e,t,r)=>{const n=r(773),s=r(722),{UserInputError:o}=r(262),a=r(739),i=r(804),{SECRET_KEY:d}=(r(266),r(636)),{validateRegisterData:c,validateLogin:m}=r(919);function u(e){return s.sign({id:e._id,username:e.username,email:e.email},d,{expiresIn:"1h"})}const w={Query:{async getUsers(){try{return await a.find().sort({createdAt:-1})}catch(e){throw new Error(e)}}},Mutation:{async registerUser(e,{registerInput:{username:t,email:r,password:s,confirmPassword:i}}){const{valid:d,errors:m}=c(t,r,s,i);if(!d)throw new o("Errors",{errors:m});if(await a.findOne({username:t}))throw new o("Oops, username is already taken :(",{error:"Oops, username is already taken :("});s=await n.hash(s,12);const w=new a({username:t,email:r,password:s,createdAt:(new Date).toISOString()}),p=await w.save(),l=u(p);return{...p._doc,id:p._id,token:l}},async login(e,{username:t,password:r}){const{valid:s,errors:i}=m(t,r);if(!s)throw new o("Error",{errors:i});const d=await a.findOne({username:t});if(!d)throw i.general="User not found",new o("User not found",{errors:i});if(!await n.compare(r,d.password))throw i.general="Incorrect Password",new o("Incorrect Password");const c=u(d);return{...d._doc,id:d._id,token:c}},async deleteUser(e,{userId:t}){try{const e=await a.findById(t);if(e){const t=await i.find();return t&&t.map((t=>{t.username===e.username&&t.delete()})),e.delete(),"User Deleted"}throw new Error("something went wrong")}catch(e){throw new Error(e)}},async editUser(e,{editInput:{userId:t,username:r,email:s,password:d,confirmPassword:m}}){const{valid:u,errors:w}=c(r,s,d,m);if(!u)throw new Error(w);d=await n.hash(d,12);try{const e=await a.findById(t);return(await i.find()).map((t=>{t.username===e.username&&(t.username=r),t.likes.map((t=>{t.username===e.username&&(t.username=r)})),t.comments.map((t=>{t.username===e.username&&(t.username=r)})),t.save()})),await a.findOneAndUpdate({_id:t},{username:r,email:s,password:d},{new:!0})}catch(e){throw new o(e)}}}};e.exports=w},78:(e,t,r)=>{const{gql:n}=r(262),s=n`
    type Query{
        getPosts: [Post]!
        getPost(postId:ID!): Post!
        getUsers: [User]!
    }

    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        countLikes: Int!
        countComments: Int!
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

    input EditInput{
        userId: ID!
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation{
        registerUser(registerInput: RegisterInput!): User!
        editUser(editInput: EditInput!): User!
        deleteUser(userId: ID!): String!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        editPost(postId: ID!, body: String!): Post!
        editComment(postId:ID!, commentId: ID!, body: String!): Post!
        deletePost(postId: ID!): String!
        commentPost(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`;e.exports=s},804:(e,t,r)=>{const n=r(619),s=new n.Schema({body:String,username:String,createdAt:String,comments:[{body:String,username:String,createdAt:String}],likes:[{username:String,createdAt:String}],user:{type:n.Schema.Types.ObjectId,refs:"users"}});e.exports=n.model("Post",s)},739:(e,t,r)=>{const n=r(619),s=new n.Schema({username:String,email:String,password:String,createdAt:String});e.exports=new n.model("User",s)},423:(e,t,r)=>{const n=r(619),{ApolloServer:s}=r(232),o=(r(127),r(622),r(636)),a=r(78),i=r(991),d=o.PORT||3e3,c=o.MONGO_URL,m=new s({cors:{origin:"*",credentials:!0},typeDefs:a,resolvers:i,context:({req:e})=>({req:e})});n.connect(c,{useUnifiedTopology:!0,useNewUrlParser:!0}).then((()=>{console.log("connected to MongoDB")})).catch((e=>{console.error(e)})),m.listen(d,(e=>{if(e)return console.log(e);console.log("Connected to Server on port: ",d)}))},232:e=>{"use strict";e.exports=require("apollo-server")},262:e=>{"use strict";e.exports=require("apollo-server-express")},773:e=>{"use strict";e.exports=require("bcryptjs")},127:e=>{"use strict";e.exports=require("express")},722:e=>{"use strict";e.exports=require("jsonwebtoken")},619:e=>{"use strict";e.exports=require("mongoose")},622:e=>{"use strict";e.exports=require("path")}},r={};return function e(n){if(r[n])return r[n].exports;var s=r[n]={exports:{}};return t[n](s,s.exports,e),s.exports}(423)})();