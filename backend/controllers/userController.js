const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')
const res = require('express/lib/response')

// @desc Register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body)
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  const userExist = await user.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = await user.create({
    name,
    email,
    password: hashedPassword,
  })
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    })
  } else {
    res.status(400).json({
      message: 'Invalid credentials',
    })
  }
})


// @desc login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  const userExist = await user.findOne({ email })
  if (!userExist) {
    res.status(400)
    throw new Error('User does not exist')
  }
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    res.status(200).json({
      _id: userExist.id,
      username: userExist.name,
      email: userExist.email,
      token: generateToken(userExist.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc get user data
// @route POST /api/users/me
// @access privet
const loginMe = asyncHandler(async (req, res) => {
  const { _id, email, name } = req.user
    res.status(200).json({
        id:_id,
        email,
        name,     
})
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  loginMe,
  generateToken,
}
