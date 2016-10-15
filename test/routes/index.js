import request from 'supertest';
import app from '../../app';

describe('GET /', () => {
  context('without query', () => {
    it('respond with status 200', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  context('with valid query', () => {
    context('with existing id', () => {
      it('respond with status 200', (done) => {
        request(app)
          .get('/')
          .query('id=1')
          .expect(200, done);
      });
    });
  });

  context('with invalid query', () => {
    it('respond with status 200', (done) => {
      request(app)
        .get('/')
        .query('invalid')
        .expect(200, done);
    });
  });
});
