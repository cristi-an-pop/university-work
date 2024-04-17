const request = require('supertest');
const app = require('../../src/server');
const { createListExample } = require('../../src/utils/createListExamples');
const { createTaskExample } = require('../../src/utils/createTaskExamples');

beforeAll(() => {
    createListExample();
    createTaskExample();
})

describe('Lists API Test', () => {
    test('GET /api/lists', () => {
        return request(app).get('/api/lists')
            .expect(200)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.length).toBe(2);
            })
    })
    test('POST /api/lists', () => {
        const newList = {
            id: '789',
            name: 'test3',
        }
        return request(app).post('/api/lists')
            .send(newList)
            .expect(201)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.name).toBe('test3');
            })
    })
    test('PATCH /api/lists/:id', () => {
        const updatedList = {
            id: '789',
            name: 'test3-updated',
        }
        return request(app).patch('/api/lists/789')
            .send(updatedList)
            .expect(200)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.id).toBe('789');
                expect(response.body.name).toBe('test3-updated');
            })
    })

    test('DELETE /api/lists/:id', () => {
        return request(app).delete('/api/lists/789')
            .expect(200)
    })
    
    test('GET /api/lists/:id', () => {
        return request(app).get('/api/lists/456')
            .expect(200)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.id).toBe('456');
                expect(response.body.name).toBe('test2');
            })
    })
});

describe('Tasks API Test', () => {
    test('GET /api/lists/:listId/tasks', () => {
        return request(app).get('/api/lists/123/tasks')
            .expect(200)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.length).toBe(0);
            })
    });

    test('POST /api/lists/:listId/tasks', () => {
        const newTask = {
            id: '456',
            name: 'task1',
            completed: false,
        }
        return request(app).post('/api/lists/123/tasks')
            .send(newTask)
            .expect(201)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.name).toBe('task1');
            })
    });

    test('PATCH /api/lists/:listId/tasks/:taskId', () => {
        const updatedTask = {
            id: '456',
            name: 'task1-updated',
            completed: true,
        }
        return request(app).patch('/api/lists/123/tasks/456')
            .send(updatedTask)
            .expect(200)
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.body.id).toBe('456');
                expect(response.body.name).toBe('task1-updated');
                expect(response.body.completed).toBe(true);
            })
    });

    test('DELETE /api/lists/:listId/tasks/:taskId', () => {
        return request(app).delete('/api/lists/123/tasks/456')
            .expect(200)
    });
});