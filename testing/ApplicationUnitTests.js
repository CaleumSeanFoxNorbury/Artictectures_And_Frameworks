const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const should = chai.should();

chai.use(chaiHttp);

/*************************** ROUTE TESTING ***************************/
//Dashboard Routes
describe('GET Dashboard', () => {
    it('It should get status code 200, and have an object returned', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
//User Routes
describe('GET User home', () => {
    it('It should get status code 200, and have an object returned', (done) => {
        chai.request(server)
        .get('/user')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});    
describe('POST User login', () => {
    it('It should get status code 200, and have an object returned', (done) => {
        chai.request(server)
        .get('/user/login')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
}); 
describe('POST User register', () => {
    it('It should get status code 200, and have an object returned', (done) => {
        chai.request(server)
        .get('/user/register')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
}); 
//Document Routes
describe('GET Documents home', () => {
    it('It should get status code 200, and have an array of objects returned', (done) => {
        chai.request(server)
        .get('/documents')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});
describe('POST Documents upload', () => {
    it('It should get status code 200.', (done) => {
        chai.request(server)
        .get('/documents/upload')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
describe('POST Documents open update', () => {
    it('It should get status code 200.', (done) => {
        chai.request(server)
        .get('documents/open/update')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
describe('POST Documents close update', () => {
    it('It should get status code 200.', (done) => {
        chai.request(server)
        .get('documents/close/update')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});

/*********************************************************************/
