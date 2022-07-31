import { Router} from 'express'
import AuthController from '../controllers/auth.controller'


const router = Router()
const authController = new AuthController()

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/refreshToken', authController.refreshToken);
router.get('/isLoggedIn', authController.isLoggedIn);




export default router
