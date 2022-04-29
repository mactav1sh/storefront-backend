// import app from '../index';
// import supertest from 'supertest';

import UserStore from '../models/user';
import User from '../types/userType';
import client from '../database/database';

const store = new UserStore();

// const request = supertest(app);
// describe('Users Endpoints Testing', () => {
//   it('api/users Endpoint', async () => {
//     const response = await request.get('/api/users');
//     expect(response.status).toBe(200);
//   });
// });

describe('Users - Testing for the Existance of Model Methods', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(store.showUser).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(store.createUser).toBeDefined();
  });
});

describe('Users - Testing results of Model methods', () => {
  const test_user = {
    first_name: 'test',
    last_name: 'user',
    password: 'password123',
  } as User;

  beforeAll(async () => {
    const userResponse = await store.createUser(
      test_user.first_name,
      test_user.last_name,
      test_user.password as string
    );
    test_user.id = userResponse.id;
  });

  it('create method should create a user', async () => {
    const response = await store.createUser('test2', 'user2', 'password123');
    expect(response).toEqual({
      first_name: 'test2',
      last_name: 'user2',
      id: 2,
    });
  });

  it('show user method shoud get a user with a specific id', async () => {
    const response = await store.showUser(test_user.id as number);
    expect(response).toEqual({
      first_name: test_user.first_name,
      last_name: test_user.last_name,
      id: test_user.id,
    });
  });
  it('index method shoud get all users', async () => {
    const response = await store.index();
    expect(response).toEqual([
      {
        first_name: test_user.first_name,
        last_name: test_user.last_name,
        id: test_user.id,
      },
      {
        first_name: 'test2',
        last_name: 'user2',
        id: 2,
      },
    ]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
    );
    connection.release();
  });
});
