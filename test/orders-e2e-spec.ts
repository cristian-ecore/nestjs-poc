import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Orders', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET orders`, async() => {
    const response = await request(app.getHttpServer())
      .get('/orders')
      .expect(200)
      .expect('Content-Type', /json/)
      
      expect(response.body).toBeInstanceOf(Array);
  });

  it(`/POST return 404 if send a clientId that dont exist`, async() => {
      
    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        "createdAt": "2022-12-05",
        "itens": [
            "remedio"
        ],
        "clientId": "627e66b740fdca0d4ce538a2"
    })
      .expect(404)
      .expect('Content-Type', /json/);
  });

  it(`/POST return 404 if send a clientId that dont exist`, async() => {

    const responseClient = await request(app.getHttpServer())
    .post('/clients')
    .send({
      name: "fulaninho fulano",
      birthDate: "1998-10-16",
      email: "any_email@hotmail.com",
      cep: "93548130"
  });

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        "createdAt": "2022-12-05",
        "itens": [
            "remedio"
        ],
        "clientId": responseClient.body.id
    })
      .expect(201)
      .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('itens',[
        "remedio"
    ]);
  });

  it(`/GET order by id`, async() => {
    const responsePost = await request(app.getHttpServer())
      .post('/orders')
      .send({
        name: "fulaninho fulano",
        birthDate: "1998-10-16",
        email: "any_email@hotmail.com",
        cep: "93548130"
    });

    const response = await request(app.getHttpServer())
    .get(`/orders/${responsePost.body.id}`)
    .expect(200)
    .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('email',"any_email@hotmail.com");
  });

//   it(`/PATCH order`, async() => {
//     const responsePost = await request(app.getHttpServer())
//       .post('/orders')
//       .send({
//         name: "fulaninho fulano",
//         birthDate: "1998-10-16",
//         email: "any_email@hotmail.com",
//         cep: "93548130"
//     });

//     const response = await request(app.getHttpServer())
//     .patch(`/orders/${responsePost.body.id}`)
//     .send({
//       email: "any_email_updated@hotmail.com"
//     })
//     .expect(200);

//     expect(response.body).toHaveProperty('email',"any_email@hotmail.com");
//   });

//   it(`/DELETE order`, async() => {
//     const responsePost = await request(app.getHttpServer())
//       .post('/orders')
//       .send({
//         name: "fulaninho fulano",
//         birthDate: "1998-10-16",
//         email: "any_email@hotmail.com",
//         cep: "93548130"
//     });

//     await request(app.getHttpServer())
//     .delete(`/orders/${responsePost.body.id}`)
//     .expect(200);
//   });

  afterAll(async () => {
    await app.close();
  });
});