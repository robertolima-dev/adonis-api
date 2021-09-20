'use strict'

const User = use('App/Models/User')

class UserController {

    async register({ auth, request, response }) {
        try {
            const data = request.all()
            await User.create(data)
            const token = await auth.attempt(data.email, data.password)
            response.status(201).send(token)
        } catch(error) {
            response.send(401).send(error)
        }
    }

    async login({ auth, request, response }) {
        try {
            const { email, password } = request.all()
            const token = await auth.attempt(email, password)
            if(!token) {
                response.status(401).json({ message: 'Not authenticated'})
            }
            response.status(200).send(token)
        } catch(error) {
            response.send(401).send(error)
        }
    }

    async me({ auth, response }) {
        try {
            response.status(200).send(auth.user)
        } catch(error) {
            response.send(401).send(error)
        }
    }
}

module.exports = UserController
