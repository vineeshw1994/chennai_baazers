import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDataUri } from '../utils/features.js'
import cloudinary from 'cloudinary';
import otpModel from '../models/otpModel.js';
import fast2sms from 'fast-two-sms';

const API = process.env.FAST_TWO_SMS_API
export const register = async (req, res) => {
    console.log('this is the register function')
    try {
        // console.log(req.body)
        const { name, email, password, contact, city, address } = req.body;

        const phone = Number(contact)
        if (!name || !email || !contact || !city || !address || !password) {
            return res.status(422).json({ message: 'Please add all the fields', success: false })
        }
        const userExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
        // console.log('this is the exist user', userExist)
        if (userExist) {
            if (userExist.email === email) {
                return res.status(400).json({ message: 'Email already exist', success: false })
            } if (userExist.phone === phone) {
                return res.status(400).json({ message: 'Phone number already exist', success: false })
            }
        }
        console.log('this is after exist user')
        const hashedPassword = bcrypt.hashSync(password, 10);
        // await cloudinary.v2.uploader.destroy(userExist.profilePic.public_id)
        const file = getDataUri(req.file)
        // update
        const cdb = await cloudinary.v2.uploader.upload(file.content)


        const user = await userModel.create({
            username: name,
            email,
            city,
            phone: contact,
            address,
            password: hashedPassword,
            profilePic: {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
        })
        await user.save()

        res.status(201).json({ message: 'User registered successfully, please login', success: true, })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: ' Try after sometime', success: false, err })
    }
}

//login
export const login = async (req, res) => {
    console.log('this is the login function')
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ message: 'Please add email or password', success: false })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: 'User not found', success: false })
        }
        // check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(500).json({ message: 'Invalid credentials', success: false })
        }




        //token
        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET,
            // { expiresIn: '1d' }
        )

        res.status(200).cookie('access_token', token,
            // {
            //     expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            //     secure: process.env.NODE_ENV === "development" ? true : false,
            //     httpOnly: process.env.NODE_ENV === "development" ? true : false,
            //     sameSite: process.env.NODE_ENV === "development" ? true : false,
            // }
        ).json({ message: 'Login successful', success: true, token, user })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in Login Api', success: false, error })
    }
}

// forgot password
export const forgotPassword = async (req, res) => {
    console.log('this is the forgot password function')
    try {
        const { phone } = req.body;
        console.log(phone)
        const number = Number(phone)
        if (!phone) {
            return res.status(422).json({ message: 'Please add phone number', success: false })
        }
        const user = await userModel.findOne({ phone })
        if (!user) {
            return res.status(500).json({ message: 'Number not found', success: false })
        }
        //   otp generator
        let randome = Math.floor(Math.random() * 9000) + 1000;
        console.log(randome);
        //sms sending to the user 

        fast2sms.sendMessage({
            authorization: API,
            message: `Your verification OTP is: ${randome}`,
            numbers: [number],
        })
            .then(saveUser())

        //save randome Number to database then render verify page
        function saveUser() {
            const newUser = new otpModel({
                number: randome
            })
            newUser.save()
                .then(() => {
                    res.status(200).json({ message: 'OTP sent successfully', success: true })
                })
                .catch((error) => {
                    console.log("error generating numb");
                    res.status(500).json({ message: 'Error in OTP sending', success: false, error })
                });
        }




    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in forgot password Api', success: false, error })
    }
}


//profile
export const userProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        user.password = undefined
        //   const { password: pass, ...rest } = user._doc;
        console.log('this is user', user)
        res.status(200).json({ message: 'User Profile fetched successfully', success: true, user })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in userProfile Api', success: false, error })
    }
}

export const logout = async (req, res) => {
    console.log('this is the logout function')
    try {
        res.status(200).clearCookie('access_token',
            // {
            //     expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            //     secure: process.env.NODE_ENV === "development" ? true : false,
            //     httpOnly: process.env.NODE_ENV === "development" ? true : false,
            //     sameSite: process.env.NODE_ENV === "development" ? true : false,
            // }
        ).json({ message: 'Logout successful', success: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in logout Api', success: false, error })
    }
}

//update user profile
export const updateProfile = async (req, res) => {
    console.log('this is the user update function')
    try {
        const user = await userModel.findById(req.user.id)
        const { name, email, address, city, contact, password } = req.body
        console.log(req.body.name)
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        if (name) user.username = name
        if (email) user.email = email
        if (password) user.password = req.body.password
        if (contact) user.phone = contact
        if (city) user.city = city
        if (address) user.address = address

         // file get from client photo
         const file = getDataUri(req.file)
         //delete previous image 
         await cloudinary.v2.uploader.destroy(user.profilePic.public_id)
 
         // update
         const cdb = await cloudinary.v2.uploader.upload(file.content)
         user.profilePic = {
             public_id: cdb.public_id,
             url: cdb.secure_url
         }

        const data = await user.save()
        res.status(200).json({ message: 'Profile updated successfully', success: true, data })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in profile update Api', success: false, error })
    }
}

export const updatePicture = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        // file get from client photo
        const file = getDataUri(req.file)
        //delete previous image 
        await cloudinary.v2.uploader.destroy(user.profilePic.public_id)

        // update
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        user.profilePic = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        // save function
        await user.save()
        res.status(200).json({ message: 'Picture updated successfully', success: true, })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in picture update Api', success: false, error })
    }
}