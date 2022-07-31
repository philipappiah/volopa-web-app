import { Router} from 'express'
import AuthController from '../controllers/auth.controller'
import UserController from '../controllers/user.controller'


const router = Router()
const authController = new AuthController()
const userController = new UserController()


// protect all routes from here

router.use(authController.protect)

router
  .route('/')
  .get(userController.getUsers)

router
  .route('/:id')
  .get(userController.getUser)

export default router
