const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const userDetails = {
    register: async (req, res) => {
        try {
            const { firstname,lastname, username, email, password,phone } = req.body
            console.log(req.body);
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await User.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await User.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new User({
                firstname,lastname, username: newUserName, email, password: passwordHash, phone
            })
            await newUser.save()

            res.json({
                msg: 'Register Success!',
                success: true,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const user = await User.findOne({username})
           
            if(!user) return res.status(400).json({msg: "This username does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
        
            res.json({
                success: true,
                msg: 'Login Success!',
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }},

} 

module.exports=userDetails;


 