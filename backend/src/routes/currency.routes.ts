import { Router} from 'express'
import CurrencyController from '../controllers/currency.controller'



const router = Router()
const currencyController = new CurrencyController()

router.post('/', currencyController.createCurrency);
router.get('/', currencyController.getCurrencies);
router.get('/convert', currencyController.convert);
router.get('/:id', currencyController.getCurrency);
router.patch('/:id', currencyController.updateCurrency)
router.delete('/:id', currencyController.deleteCurrency);



export default router
