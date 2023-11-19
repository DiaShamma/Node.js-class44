zapp.test.js
import request from 'supertest';
import app from '../server.js';

describe('POST /weather', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should respond with "City is not found!" for invalid city', async () => {
    const response = await request(server).post('/weather').send({ cityName: 'InvalidCityName' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toBe('City is not found!');
  });

  it('should respond with temperature for valid city', async () => {
    const response = await request(server).post('/weather').send({ cityName: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toMatch(/Temperature in London: \d+\.\d+°C/);
  });



});


