import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import chai from 'chai';
import app from '../../core/app';
import UserModel from '../../resources/user/models/user';
import userData from '../mock/user';

chai.should();

chai.use(chaiHttp);
const APP_BASE_ROUTE = '/api/v1';

describe('User login test cases/', () => {
  it('login user', (done) => {
    UserModel.create({
      ...userData,
      password: bcrypt.hashSync(userData.password, 10),
    });
    chai.request(app)
      .post(`${APP_BASE_ROUTE}/users/login`)
      .send(userData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.user.should.have.property('email').eql(userData.email);
        done();
      });
  }).timeout(10000);

  it('Should trigger invalid credentials', (done) => {
    userData.password = 'pass';
    chai.request(app)
      .post(`${APP_BASE_ROUTE}/users/login`)
      .send(userData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Invalid email or password');
        done();
      });
  }).timeout(10000);
});
