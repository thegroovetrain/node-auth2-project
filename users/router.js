const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./model')
const restrict = require('../server/middleware/restrict')

const router = express.Router()

router.get('/users', restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})

router.post('/users', async (req, res, next) => {
    try {
        const {username, password, department} = req.body
        const user = await Users.findBy({username}).first()

        if (user) {
            return res.status(409).json({
                message: "Username is already taken."
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 14),
            department
        })

        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Users.findBy({username}).first()

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        const payload = {
            userId: user.id,
            username: user.username,
            department: user.department
        }

        res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET))

        res.status(200).json({
            message: `Welcome ${user.username}`
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router