import { CatchExpressError } from "../utils/errorHandlers";
import { ResponseHandlers } from "../utils/responseHandler";
import {Response, Request, NextFunction} from 'express'
import { UserModel, User } from "../models/user.model";
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


require('dotenv').config();


class AuthController {

    createToken = (id:string, secret:string | undefined, expiry:string | undefined) => {
        return jwt.sign({ id }, secret, {
          expiresIn: expiry
        });
      };



    sendJWToken = async (user:User, statusCode:number, req:Request, res:Response) => {
        const token = this.createToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        const refreshToken = this.createToken(user._id,process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN )
        
      
        const expiry : number =  Number(process.env.COOKIE_EXPIRES_IN) 
        res.cookie('jwt', token, {
          expires: new Date(
            Date.now() + expiry * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        });
     
      
      
       // remove password and passwordConfirm from output
        user.password = '';
        user.passwordConfirm = '';
      
        res.status(statusCode).json({
          valid:true,
          token,
          user,
          refreshToken,
          
        });
      };


    signup = CatchExpressError(async (req:Request, res:Response, next:NextFunction) => {
      const userExists = await UserModel.findOne({ email:req.body.email })

      if(userExists){
        return (res.status(422).send({
          message: 'User already exists. Please login!'

      }))
      }
        const newUser = await UserModel.create(req.body);

        this.sendJWToken(newUser, 201, req, res);

    })

    login = CatchExpressError(async (req:Request, res:Response, next:NextFunction) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
            return (res.status(404).send({
                message: 'Please provide email and password'

            }))
            
          }
        
       
        const user = await UserModel.findOne({ email }).select('+password');
       
        if (!user || !(await user.checkPassword(password, user.password))) {
            return (res.status(404).send({
                message: 'Incorrect email or password!'

            }))
         
        }
      
        // 3) If everything ok, send token to client
        this.sendJWToken(user, 200, req, res);
      });


      logout = (req:Request, res:Response) => {
        res.cookie('jwt', 'loggedout', {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true
        });
        res.status(200).json({ status: 'success', message:'logged out' });
      };
      

      protect = CatchExpressError(async (req:Request, res:Response, next:NextFunction) => {
        //  check jwt token
        let token;
       
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
          token = req.cookies.jwt;
        }
        

      
        if (!token) {
            return (res.status(401).send({
                message: 'You are not logged in! Please log in to get access'

            }))
       
        }
      
        //  Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
     
        const currentUser = await UserModel.findById(decoded.id);
        if (!currentUser) {
            return (res.status(401).send({
                status: 'fail',
                message: 'User no longer exist!'

            }))
         
        }
    
      
        // grant access to user
        res.locals.user = currentUser;
        next();
      });


      refreshToken = CatchExpressError(async (req:Request, res:Response, next:NextFunction) => {



        
       try{

        const decoded = await promisify(jwt.verify)(
          req.body.refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
  
      
        const currentUser = await UserModel.findById(decoded.id);

        if (!currentUser) {
          return (res.status(401).send({
            message: 'User no longer exist!',
            valid:false,
            user:null

        }))
        }

        // 3) If everything ok, send token to client
        this.sendJWToken(currentUser, 200, req, res);
      

      }catch(err){

        res.status(404).send({
          message:'token expired. Please login again',
          valid:false,
          user:null
        })

      }


      })


      isLoggedIn = CatchExpressError(async (req:Request, res:Response, next:NextFunction) => {


        

       
       
       
    
          try {
           
            const decoded = await promisify(jwt.verify)(
              req.cookies.jwt,
              process.env.JWT_SECRET
            );

            
          
            const currentUser = await UserModel.findById(decoded.id);
           
            if (!currentUser) {
              return (res.status(401).send({
                message:'Invalid user',
                valid:false,
                user:null
              }))
            }
      
           
            
            res.locals.user = currentUser;
            res.status(200).send({
              message:'token is valid',
              valid:true,
              user:currentUser
            })
          } catch (err) {
            
            res.status(404).send({
              message:'token expired',
              valid:false,
              user:null
            })
          }
        

        
       
      });




      


}





export default AuthController