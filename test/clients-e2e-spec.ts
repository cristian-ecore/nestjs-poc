import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Clients', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET clients`, async() => {
    const response = await request(app.getHttpServer())
      .get('/clients')
      .expect(200)
      .expect('Content-Type', /json/)
      
      expect(response.body).toBeInstanceOf(Array);
  });

  it(`/POST clients`, async() => {
    const response = await request(app.getHttpServer())
      .post('/clients')
      .send({
        name: "fulaninho fulano",
        birthDate: "1998-10-16",
        email: "any_email@hotmail.com",
        cep: "93548130"
    })
      .expect(201)
      .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('email',"any_email@hotmail.com");
  });

  it(`/GET client by id`, async() => {
    const responsePost = await request(app.getHttpServer())
      .post('/clients')
      .send({
        name: "fulaninho fulano",
        birthDate: "1998-10-16",
        email: "any_email@hotmail.com",
        cep: "93548130"
    });

    const response = await request(app.getHttpServer())
    .get(`/clients/${responsePost.body.id}`)
    .expect(200)
    .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('email',"any_email@hotmail.com");
  });

  it(`/PATCH client`, async() => {
    const responsePost = await request(app.getHttpServer())
      .post('/clients')
      .send({
        name: "fulaninho fulano",
        birthDate: "1998-10-16",
        email: "any_email@hotmail.com",
        cep: "93548130"
    });

     await request(app.getHttpServer())
    .patch(`/clients/${responsePost.body.id}`)
    .send({
      email: "any_email_updated@hotmail.com"
    })
    .expect(200);

    const response = await request(app.getHttpServer())
    .get(`/clients/${responsePost.body.id}`)
    .expect(200)
    .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('email',"any_email_updated@hotmail.com");
    
  });

  it(`/DELETE client`, async() => {
    const responsePost = await request(app.getHttpServer())
      .post('/clients')
      .send({
        name: "fulaninho fulano",
        birthDate: "1998-10-16",
        email: "any_email@hotmail.com",
        cep: "93548130"
    });

    await request(app.getHttpServer())
    .delete(`/clients/${responsePost.body.id}`)
    .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});