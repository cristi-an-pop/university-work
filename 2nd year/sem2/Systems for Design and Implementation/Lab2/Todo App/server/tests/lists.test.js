const request = require('supertest');
const express = require('express');
const listsRouter = require('../routes/lists');

const app = express();
app.use(express.json());
app.use('/', listsRouter);

describe('Test the lists routes', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get("/api/lists");
        expect(response.statusCode).toBe(200);
    });

    test('It should response the POST method', async () => {
        const response = await request(app).post("/api/lists").send({id: 1, name: 'Test List'});
        expect(response.statusCode).toBe(201);
    });

    test('It should response the DELETE method', async () => {
        const response = await request(app).delete("/api/lists/1");
        expect(response.statusCode).toBe(204);
    });
});