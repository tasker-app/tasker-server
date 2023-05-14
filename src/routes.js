// const userRouter = require('./routes/user.route')
import userRouter from './routes/user.route.js'

const routes = (router) => {
  router.use('/api/users', userRouter)
}

// module.exports = routes
export default routes
