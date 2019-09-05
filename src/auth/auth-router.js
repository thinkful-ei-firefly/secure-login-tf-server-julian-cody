const express = require('express')
const AuthService = require('./auth-service')



const authRouter = express.Router()

authRouter
  .post('/login', (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }

    for (const [key, value ] of Object.entries(loginUser)) 
      if (value == null)
        return res.status(400).json({
          error: `missing '${key}' in request body`
        })

        AuthService.getUserWithUserName(
          req.app.get('db'),
          loginUser.user_name
        )
         .then(dbUser => {
            if (!dbUser){
              return res.status(400).json({
                error: 'Incorrect user_name or password'
              })


            }
          })

          console.log('here')

    res.send('ok')
  })

module.exports = authRouter