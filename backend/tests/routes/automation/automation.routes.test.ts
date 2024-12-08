import request from 'supertest';
import app from '../../../src/app';

describe('Automation Routes', () => {
    it('should create a new automation', async () => {
        const response = await request(app)
            .post('/api/automations')
            .send({
                name: 'Test Automation',
                url: 'http://example.com',
                scenario: { scenarioSteps: [] },
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Automation created successfully!');
    });

    it('should return 400 for invalid automation', async () => {
        const response = await request(app)
            .post('/api/automations')
            .send({
                name: '',
                url: '',
                scenario: null,
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});
