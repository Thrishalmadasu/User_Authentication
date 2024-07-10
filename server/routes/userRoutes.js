const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const email = req.body.email;

        const emailExist = await User.findOne({email});

        if(emailExist) return res.status(400).json({error: "Email already exists"});
        
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;

        const newUser =new User(req.body);
        await newUser.save();
        res.status(200).json({message : "User Created" , user : newUser });
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email : req.body.email});

    if(!user) return res.status(400).json({error: "Email does not exist"});

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).json({error: "Invalid Password"});

    res.status(200).json({message: "Login Successful" , user : user});
});


module.exports = router;