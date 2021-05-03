let server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');

//Assertion
chai.should();
chai.use(chaiHttp);
// api tests

//get route returns list of coins with id, name, price, and logo URL
describe('Coinlist APIs', ()=> {
    describe("Test Get route /api/coins", () => {
        it("It should return all coins with corrisponding id, name, price and logo Url", (done) => {
            chai.request(server)
            .get('/api/coins')
            .end((err,response) => {
                console.log('Errors: ' + err);
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eq(0);
            done();    
            });
        })
    })
    describe("Test Get route /api/coins/prices", () => {
        it("It should return current price for three test coins", (done) => {
            chai.request(server)
            .get('/api/coins/prices')
            .end((err,response) => {
                console.log('Errors: ' + err);
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eq(0);
            done();    
            });
        })
    })
})

//get route - returns coinprice for given coin ID


//Database tests

//put route - saves user to DB

//get route - get user

//put route - save coin amount (multiple coins)

//get route - get coinbalance (current day)

//put route - past data intial data for past 15 days will be 0 balance and update each day

//get route - get past balances (last 15 days) - returns 



