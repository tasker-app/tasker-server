import taskRouter from './routes/task.route.js'
import userRouter from './routes/user.route.js'

const routes = (router) => {
  router.use('/api/users', userRouter)
  router.use('/api/tasks', taskRouter)
}

// module.exports = routes
export default routes
