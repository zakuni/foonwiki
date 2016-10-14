import request from 'supertest';
import app from '../../app';

describe('GET /', () => {
  it('respond with status 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
