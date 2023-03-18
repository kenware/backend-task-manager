import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import chai from 'chai';
import app from '../../core/app';
import userData from '../mock/user';
import taskData from '../mock/task';
import UserModel from '../../resources/user/models/user';
import TaskModel from '../../resources/task/models/task';
import generateToken from '../../resources/user/utils/user';
import ITask from '../../resources/task/interfaces/taskModel';
import IUser from '../../resources/user/interfaces/userModel';

chai.should();

chai.use(chaiHttp);
const APP_BASE_ROUTE = '/api/v1';
let token: string;
let user: IUser;
let task: ITask;

describe('Task test cases/', () => {
  before(async () => {
    user = UserModel.create({
      ...userData,
      password: bcrypt.hashSync(userData.password, 10),
    });
    token = generateToken(user);
    task = TaskModel.create({ ...taskData, userId: user.id });
  });

  it('create a task', (done) => {
    chai.request(app)
      .post(`${APP_BASE_ROUTE}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send(taskData)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('data').be.an('object');
        res.body.data.should.have.property('title').eql(taskData.title);
        done();
      });
  });

  it('get all tasks', (done) => {
    chai.request(app)
      .get(`${APP_BASE_ROUTE}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data').be.an('array');
        done();
      });
  });

  it('get a task', (done) => {
    chai.request(app)
      .get(`${APP_BASE_ROUTE}/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data').be.an('object');
        res.body.data.should.have.property('user');
        res.body.data.should.have.property('task');
        res.body.data.task.should.have.property('title').eql(task.title);
        done();
      });
  });

  it('update a task', (done) => {
    const newTitle = 'new';
    chai.request(app)
      .put(`${APP_BASE_ROUTE}/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...taskData, title: newTitle })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data').be.an('object');
        res.body.data.should.have.property('title').eql(newTitle);
        done();
      });
  });

  it('delete a task', (done) => {
    const newTitle = 'new';
    chai.request(app)
      .delete(`${APP_BASE_ROUTE}/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...taskData, title: newTitle })
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.an('object');
        done();
      });
  });
});
