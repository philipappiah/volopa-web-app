import { CatchExpressError } from "../utils/errorHandlers";
import { ResponseHandlers } from "../utils/responseHandler";
import { Response, Request, NextFunction } from 'express'
import { UserModel } from "../models/user.model";

class UserController {

    getUsers = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        // handle filtering, sorting, fieldLimiting and pagination based on the request

        const documents = new ResponseHandlers(UserModel.find(), req.query).filter().sort().limitFields().paginate()
        const data = await documents.model

        res.status(200).send(data)

    })


    getUser = CatchExpressError(async (req: Request, res: Response, next: NextFunction) => {

        const document = await UserModel.findById(req.params.id)

        if (!document) {
            return (res.status(404).send({
                status: 'fail',
                message: 'No document found!'

            }))

        }

        res.status(200).send(document)

    })

}


export default UserController