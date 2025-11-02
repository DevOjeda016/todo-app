import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import http from 'http';
import { Task } from 'src/tasks/entities/task.entity';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let httpServer: http.Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = app.get(DataSource);
    httpServer = app.getHttpServer() as http.Server;
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('Success: /tasks (POST)', () => {
    it('should create a task', async () => {
      const res = await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect((res.body as Task).title).toEqual('Test Task');
    });
  });

  describe('Success: /tasks (GET)', () => {
    it('should return an array of tasks', async () => {
      await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      return request(httpServer)
        .get('/tasks')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect((res.body as Task[]).length).toBe(1);
        });
    });
  });

  describe('Success: /tasks/:id (GET)', () => {
    it('should return a single task', async () => {
      const postRes = await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      return request(httpServer)
        .get(`/tasks/${(postRes.body as Task).id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('id', (postRes.body as Task).id);
        });
    });
  });

  describe('Failure: /tasks/:id (GET)', () => {
    it('should return 404 for a non-existent task', () => {
      const nonExistentId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      return request(httpServer).get(`/tasks/${nonExistentId}`).expect(404);
    });
  });

  describe('Failure: /tasks (POST)', () => {
    it('should return 400 for an empty body', () => {
      return request(httpServer).post('/tasks').send({}).expect(400);
    });

    it('should return 400 for a title that is not a string', () => {
      return request(httpServer)
        .post('/tasks')
        .send({ title: 123 })
        .expect(400);
    });
  });

  describe('Failure: /tasks/:id (PATCH)', () => {
    it('should return 400 for a title that is not a string', async () => {
      const postRes = await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      return request(httpServer)
        .patch(`/tasks/${(postRes.body as Task).id}`)
        .send({ title: 123 })
        .expect(400);
    });
  });

  describe('Failure: /tasks/:id (DELETE)', () => {
    it('should return 404 when deleting a non-existent task', () => {
      const nonExistentId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      return request(httpServer).delete(`/tasks/${nonExistentId}`).expect(404);
    });
  });

  describe('/tasks/:id (PATCH)', () => {
    it('should update a task', async () => {
      const postRes = await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      return request(httpServer)
        .patch(`/tasks/${(postRes.body as Task).id}`)
        .send({ title: 'Updated Title' })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('title', 'Updated Title');
        });
    });
  });

  describe('/tasks/:id (DELETE)', () => {
    it('should delete a task', async () => {
      const postRes = await request(httpServer)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test Description' });

      return request(httpServer)
        .delete(`/tasks/${(postRes.body as Task).id}`)
        .expect(204);
    });
  });
});
