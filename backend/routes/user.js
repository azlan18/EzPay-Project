//this is the router for /api/v1 --> /user

const express = require('express');
const zod = require('zod');
const { User } = require('../db');
const JWT_SECRET = require('../config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {authMiddleware} = require('../middleware')

const signupBody = zod.object({
	username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// When user signs up / Creates an account

router.post("/signup",async (req,res)=>{
	const body = req.body;
	
	const {success, error} = signupBody.safeParse(req.body);
	if(!success){
		return res.status(411).json({
			message: "Incorrect inputs/ Invalid Email",
			details: error.issues
		})
	}

	const existinguser = await User.findOne({
		username: body.username  //find a user with the same username as body.username
	})
	if(existinguser){ //check for existing user with same username, return if found
		return res.status(411).json({
			message: "User already exists"
		})
	}

		// Create the new user if none of the above happened
		const newUser = await User.create({
			username: body.username,
			password: body.password,
			firstName: body.firstName,
			lastName: body.lastName
		});

		const userId = newUser._id;
		const token = jwt.sign({userId}, JWT_SECRET);

		// Return a success response
		return res.status(201).json({
			message: "User created successfully",
			user: newUser,
			token: token
		});
	
	
});

const signinBody = zod.object({
	username: zod.string().email(),
	password: zod.string()
})
//When user existing signs in 
router.post('/signin', async(req,res)=>{
	const {success} = signinBody.safeParse(req.body)
	//do input validation
	if(!success){
		return(res.json({
			msg: "Incorrect Inputs"
		}))
	}
	//query the database for the user

	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password
	})

	if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        
		return;
    }
	
	res.status(411).json({
        message: "Error while logging in"
    })
})

//Update user info. This is a protected route
const updateBody = zod.object({
	password: zod.string(),
	firstName: zod.string(),
	lastName: zod.string()
})
router.patch('/',authMiddleware, async(req,res)=>{
	const {success} = updateBody.safeParse(req.body)
	if(!success){
		return res.status(411).json({
			msg: "Input errors. Please check"
		})
	}

	const user = await User.updateOne(
		{_id: req.userId},  //we get req.userId from the authMiddelware intervention
		req.body
	);

	res.json({
        message: "Updated successfully"
    })
})


module.exports = router;