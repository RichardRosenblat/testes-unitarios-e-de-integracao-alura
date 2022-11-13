/* eslint-disable import/no-extraneous-dependencies */
import {
  afterEach, beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import request from 'supertest';

import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras').expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;
describe('POST /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const response = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 'c@c.com',
      })
      .expect(201);
    idResposta = response.body.content.id;
  });
  it('Deve não adicionar nada se o body for vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET /editoras/:id', () => {
  it('Deve retornar uma editora especifica', async () => {
    const resposta = await request(app)
      .get(`/editoras/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body.email).toEqual('c@c.com');
  });
});

describe('PUT /editoras/:id', () => {
  test.each([
    ['nome', { nome: 'Casa do Codigo' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o campo %s', async (_campo, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE /editoras/:id', () => {
  it('Deve remover uma editora', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
