const express  = require("express");
const jwt  = require("jsonwebtoken");
const zod  = require("zod");
const cors = require("cors");
const { User, Blog } = require("./db");
const { authMiddleware } = require("./middleware");
require('dotenv').config()

const app = express();
app.use(express.json());

const signupSchema = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

app.post('/', async (req,res) => {
    const body =  req.body;
    const  {success} = signupSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            messsage: "IncorrectInputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email,
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email Already Taken!"
        })
    }

    const user =  await User.create({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })

    const userId = user._id;

    const token  = jwt.sign({
        userId
    }, process.env.JWT_SECRET);

    return res.json({
        message: "User created Successfully!",
        token: token,
    })

})


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

app.post('/signin', async (req,res) => {
    const body =  req.body;
    const  { success} = signinSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            messsage: "IncorrectInputs"
        })
    }

    const existingUser = await User.findOne({
        email: body.email,
        password: body.password
    })

    const userId = existingUser._id;

    if(existingUser) {
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET)

        res.json({
            token
        })
        return;
    }

    res.status(411).json({
        message: "Error while signin!"
    })
})

// const postSchema = zod.object({
//     email: String,
//     blog: String
// })

// email: String,
//     title: String,
//     author: String,
//     blog: String,
//     date: Date

app.post('/createpost', authMiddleware, async (req,res) => {
    const post =  await Blog.create({
        email: req.body.email,
        title: req.body.title,
        author: req.body.author,
        date: new Date().getDate(),
        blog: req.body.blog
    })
    console.log(post);
    const postId = post._id;

    res.json({
        postId: postId,
        message: "Posted succesfully!"
    })
    return;
})

app.get('/feed', async (req,res) => {

    const filter = req.query.filter || "";

    const blogs = await Blog.find({
        $or: [{
            email: {
                "$regex" : filter
            }
        },{
            blog: {
                "$regex" : filter
            }
        }]
        })
        res.json({
            blog: blogs.map( blogs => ({
            blog: blogs.blog,
            blog_id: blogs._id
        }))
    })
})


app.listen(3000);