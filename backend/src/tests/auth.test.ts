
import chai = require('chai');
import chaiHttp = require('chai-http');
import Database from '../config/db'
import { UserModel } from '../models/user.model'
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 4000
const SERVER_URL = `${BASE_URL}:${PORT}/api/v1`

const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/mydb`


let should = chai.should();


chai.use(chaiHttp);

new Database(MONGO_URL).connectDataBase()

let token = ''


describe('Authentication', () => {
  
  
    beforeEach((done) => {
        UserModel.deleteMany({}, (err) => {
        done();
      });
    });


    


     // / test GET users route
  describe('/GET users', () => {
    
    it('it should GET all the users', (done) => {

        let user = {
            name: "Philip",
            email: "pappiahkubi1@gmail.com",
            password: "test1234",
            passwordConfirm: "test1234"
          }
          chai.request(SERVER_URL)
            .post('/auth/signup')
            .send(user)
            .end((err: any, res: any) => {
              res.should.have.status(201);
              token = res.body.token
             
            });
            if(token){
      chai.request(SERVER_URL)
        .get('/users')
        .auth(token, { type: 'bearer' })
       
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    }else{
        done()
    }
    });
  });


  // /test POST register user with validation error 
  describe('/POST signup', () => {
    it('it should not REGISTER a user without email field', (done) => {
      let user = {
        name: "Philip",
        password: "test1234",
        passwordConfirm:"test1234"
      }
      chai.request(SERVER_URL)
        .post('/auth/signup')
        .send(user)
        .end((err: any, res: any) => {
          res.should.have.status(422)
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('email');
          res.body.errors.email.should.have.property('kind').eql('required');
          done();
        });
    });

  });


  // /test POST login user  
  describe('/POST login', () => {
    it('it should LOGIN a user', (done) => {

        let user = {
            name: "Philip",
            email: "philip@volopa.com",
            password: "test1234",
            passwordConfirm: "test1234"
          }
          chai.request(SERVER_URL)
            .post('/auth/signup')
            .send(user)
            .end((err: any, res: any) => {
              res.should.have.status(201);
             
              token = res.body.token
             
            })

            if(token){


                chai.request(SERVER_URL)
        .post('/auth/login')
        .send({
            email:user.email,
            password:user.password
        })
        .end((err: any, res: any) => {
          res.should.have.status(200)
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          done();
        });
    }else{
        done()
    }
            
    
      
    });

  });



  // /test GET verify authentication  
  describe('/POST isLoggedIn', () => {
    it('it should verify a user auth token', (done) => {

        let user = {
            name: "Richard",
            email: "richard@volopa.com",
            password: "test1234",
            passwordConfirm: "test1234"
          }
          chai.request(SERVER_URL)
            .post('/auth/signup')
            .send(user)
            .end((err: any, res: any) => {
              res.should.have.status(201);
             
              token = res.body.token
             
            })

            if(token){

        chai.request(SERVER_URL)
        .get('/auth/isLoggedIn')
        .auth(token, { type: 'bearer' })
       
        .end((err: any, res: any) => {
          res.should.have.status(200)
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eql(true);
          res.body.should.have.property('user');
          done();
        });
    }else{
        done()
    }
            
    
      
    });

  });





})