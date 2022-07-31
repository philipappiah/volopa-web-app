
import chai = require('chai');
import chaiHttp = require('chai-http');
import Database from '../config/db'
import { CurrencyModel } from '../models/currency.model'
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost'
const PORT = process.env.PORT || 4000
const SERVER_URL = `${BASE_URL}:${PORT}/api/v1`

const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/mydb`


let should = chai.should();


chai.use(chaiHttp);

new Database(MONGO_URL).connectDataBase()


describe('currency', () => {


    beforeEach((done) => {
        CurrencyModel.deleteMany({}, (err) => {
            done();
        });
    });

    // / test GET currency route
    describe('/GET currencies', () => {
        it('it should GET all the currencies', (done) => {
            chai.request(SERVER_URL)
                .get('/currencies')
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });



    // /test POST currency with validation error 
    describe('/POST currency', () => {
        it('it should not POST a currency without rate field', (done) => {
            let currency = {
                name: "GBP",
                longName: "British Pound",
                popularity: 10
            }
            chai.request(SERVER_URL)
                .post('/currencies')
                .send(currency)
                .end((err: any, res: any) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('rate');
                    res.body.errors.rate.should.have.property('kind').eql('required');
                    done();
                });
        });

    });


    // /test POST currency route without any validation errors
    describe('/POST currency', () => {
        it('it should POST a currency', (done) => {
            let currency = {
                name: "GBP",
                longName: "British Pound",
                rate: 1.22,
                popularity: 10
            }
            chai.request(SERVER_URL)
                .post('/currencies')
                .send(currency)
                .end((err: any, res: any) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('longName');
                    res.body.should.have.property('rate');
                    res.body.should.have.property('popularity');

                    done();
                });
        });



    });







    // /GET currencies/:id route
    describe('/GET/:id currency', () => {
        it('it should GET a currency with the given id', (done) => {

            let model = new CurrencyModel({
                name: "EUR",
                longName: "Euros",
                rate: 1.02,
                popularity: 9
            });
            model.save((err, currency) => {
                chai.request(SERVER_URL)
                    .get('/currencies/' + currency.id)
                    .send(currency)
                    .end((err: any, res: any) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('longName');
                        res.body.should.have.property('rate');
                        res.body.should.have.property('popularity');
                        res.body.should.have.property('id').eql(currency.id);
                        done();
                    });
            });

        });
    })



    // /PATCH currency/:id update currency
    describe('/PATCH/:id currency', () => {
        it('it should UPDATE a currency with the given id', (done) => {
            let model = new CurrencyModel({
                name: "CAD",
                longName: "Canadian Dollar",
                rate: 0.78,
                popularity: 4
            });
            model.save((err, currency) => {
                chai.request(SERVER_URL)
                    .patch('/currencies/' + currency.id)
                    .send({ rate: 0.81 })
                    .end((err: any, res: any) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('rate').eql(0.81);
                        done();
                    });
            });
        });
    });


    // /DELETE currencies/:id route
    describe('/DELETE/:id currency', () => {
        it('it should DELETE a currency with the given id', (done) => {

            let model = new CurrencyModel({
                name: "AUD",
                longName: "Australian Dollar",
                rate: 0.64,
                popularity: 3
            });
            model.save((err, currency) => {
                chai.request(SERVER_URL)
                    .delete('/currencies/' + currency.id)
                    .end((err: any, res: any) => {
                        res.should.have.status(204)
                        done();
                    });
            });

        });
    })





});


