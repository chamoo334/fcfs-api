import request from 'supertest';
import app from './app.js';

describe('API (/v1) Open Endpoints Get Requests', () => {
  describe('/campgrounds successful response', () => {
    let response;
    let resData;

    beforeAll(async () => {
      response = await request(app).get('/v1/campgrounds');
      resData = JSON.parse(response.text);
    });

    test('correct status code', () => {
      expect(response.statusCode).toBe(200);
    });

    test('header specifies json content type', () => {
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('response json key value pair of success:true', () => {
      expect(resData.success).toEqual(true);
    });

    test('response json should contain count', () => {
      expect(resData).toHaveProperty('count');
    });
  });
});
