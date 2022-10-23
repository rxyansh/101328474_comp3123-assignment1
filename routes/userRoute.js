//initializing var here 
const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router()

//connecting route to model 
const userModel = require("../models/user")

//Signup
routes.post('/signup', async (request, response) => {
    try {
        const newUser = new userModel(request.body)
        await newUser.save()
        response.status(201).send({
            created_user: newUser
        })
    } catch (err) {
        response.status(500).send({
            "status": false, 
            "message": err.message
        })
    }
});


//TODO - Login
routes.post("/login", async (req, res) => {
	let { username, password } = req.body
	let response
	try {
		let user = await user.findOne({ username, password })
		response = {
			status: true,
			username: user.username,
			message: "User logged in successfully"
		}
		res.status(200)
	} catch (error) {
		response = {
			status: false,
			message: "Invalid Username and password"
		}
		res.status(400)
	}
	res.send(response)
})

module.exports = routes