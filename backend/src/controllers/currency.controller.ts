

import { CatchExpressError } from "../utils/errorHandlers";
import { ResponseHandlers } from "../utils/responseHandler";
import { Response, Request, NextFunction } from 'express'
import { CurrencyModel } from "../models/currency.model";



class CurrencyController {



    createCurrency = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {
        const currencyExists = await CurrencyModel.findOne({ name: req.body.name.toUpperCase() })

        if (currencyExists) {
            return (res.status(422).send({
                message: 'Currency already exists!'

            }))
        }
        const currency = await CurrencyModel.create(req.body)

        res.status(201).send(currency)



    })

    getCurrencies = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        // handle filtering, sorting, fieldLimiting and pagination based on the request

        const documents = new ResponseHandlers(CurrencyModel.find().sort("-popularity"), req.query).filter().sort().limitFields().paginate()
        const data = await documents.model

        res.status(200).send(data)

    })


    getCurrency = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        const document = await CurrencyModel.findById(req.params.id)

        if (!document) {
            return (res.status(404).send({
                status: 'fail',
                message: 'No document found!'

            }))

        }

        res.status(200).send(document)

    })

    convert = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {



        const { from, to, amount } = req.query

        if (!from) {
            return (res.status(422).send({
                status: 'fail',
                message: 'Currency to convert from is required'

            }))

        }

        if (!to) {
            return (res.status(422).send({
                status: 'fail',
                message: 'Currency to convert to is required'

            }))

        }

        if (!amount) {
            return (res.status(422).send({
                status: 'fail',
                message: 'Amount is required'

            }))

        }




        if (Number(amount) <= 0) {
            return (res.status(422).send({
                status: 'fail',
                message: 'Amount must be greater 0'

            }))
        }
        const fromDoc = await CurrencyModel.findOne({ name: from })





        if (!fromDoc) {
            return (res.status(404).send({
                status: 'fail',
                message: 'From currency no found!'

            }))
        }

        const toDoc = await CurrencyModel.findOne({ name: to })

        if (!toDoc) {
            return (res.status(404).send({
                status: 'fail',
                message: 'To currency no found!'

            }))
        }


        const rate = Number(fromDoc.rate) / Number(toDoc.rate)
        const value = Number(amount) * rate





        res.status(200).send({

            from,
            to,
            rate,
            value



        })

    })


    updateCurrency = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        const document = await CurrencyModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!document) {
            return (res.status(404).send({
                status: 'fail',
                message: 'No document found'

            }))

        }

        res.status(200).send(document)

    })


    deleteCurrency = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        const document = await CurrencyModel.findByIdAndDelete(req.params.id)

        if (!document) {
            return (res.status(404).send({
                status: 'fail',
                message: 'No document found!'

            }))

        }

        res.status(204).send(null)

    })




}

export default CurrencyController