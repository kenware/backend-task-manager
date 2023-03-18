import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../core/app';
import userData from '../mock/user';

const newUserData = { ...userData, email: 'newEmail@gmail.com' };

chai.should();

chai.use(chaiHttp);

const APP_BASE_ROUTE = '/api/v1';

describe('user test cases/', () => {
  it('create a user', (done) => {
    chai.request(app)
      .post(`${APP_BASE_ROUTE}/users/create`)
      .send(newUserData)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('email').eql(newUserData.email);
        res.body.data.should.have.property('firstName').eql(newUserData.firstName);
        done();
      });
  }).timeout(10000);

  it('Should not create an account for existing staff', (done) => {
    chai.request(app)
      .post(`${APP_BASE_ROUTE}/users/create`)
      .send(newUserData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('User already exist');
        done();
      });
  }).timeout(10000);
});
