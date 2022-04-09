import request from 'supertest';
const createApp = require('./app.js');
const connectDB = require('./config/db');

describe('Server Tests W/O  DB', () => {
  const fakeDB = async () => {};

  async function getApp() {
    return await createApp(fakeDB);
  }

  let app;

  getApp().then(created => {
    app = created;
  });

  test('app starts and runs with fake db', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});

// describe('API (/v1) Open Endpoints Get Requests', () => {

//   describe('/campgrounds successful response', () => {
//     let response;
//     let resData;

//     beforeAll(async () => {
//       response = await request(app).get('/v1/campgrounds');
//       resData = JSON.parse(response.text);
//     });

//     test('correct status code', () => {
//       expect(response.statusCode).toBe(200);
//     });

//     test('header specifies json content type', () => {
//       expect(response.headers['content-type']).toEqual(
//         expect.stringContaining('json')
//       );
//     });

//     test('response json key value pair of success:true', () => {
//       expect(resData.success).toEqual(true);
//     });

//     test('response json should contain count', () => {
//       expect(resData).toHaveProperty('count');
//     });
//   });
// });
