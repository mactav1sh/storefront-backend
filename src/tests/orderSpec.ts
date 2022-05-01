import supertest from 'supertest';
import client from '../database/database';
import OrdersStore from '../models/order';
import Order from '../types/orderType';
import app from '../index';

const store = new OrdersStore();
const request = supertest(app);

describe('Orders - Unit Testing', () => {
  describe('Orders - Testing for the Existance of Methods', () => {
    it('Should have a get user order method', () => {
      expect(store.getUserOrder).toBeDefined();
    });
  });

  describe('Orders Endpoints Testing', async () => {
    const test_order = {
      quantity: 10,
      status: 'shipped',
      product_id: 1,
      user_id: 1,
    } as Order;

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InBhc3Nhc2QxMjMiLCJpYXQiOjE2NTEyNDg5ODF9.3c7FoZ8qnPQwpLlfsVTLMsMAZHEwgc4eC-T7uTK_leg';

    beforeAll(async () => {
      const connection = await client.connect();
      await connection.query(
        `INSERT INTO users (first_name,last_name,password) VALUES ('test','user','password123') RETURNING *;`
      );
      // user = { id:1 first_name:'test' last_name:'user' password:'password123' }
      await connection.query(
        `INSERT INTO products (name,price) VALUES ('product',10) RETURNING *;`
      );
      // product = { id:1 name:'product' price:10 }
      const sql = `INSERT INTO orders (quantity,status,product_id,user_id) VALUES (10,
       'shipped',${test_order.product_id},${test_order.user_id}) RETURNING *;`;
      const orderResponse = await connection.query(sql);
      test_order.id = orderResponse.rows[0].id;
    });

    it('api/users/:id/orders Endpoint - Show order', async () => {
      const response = await request
        .get('/api/users/1/orders')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        quantity: test_order.quantity,
        status: test_order.status,
        product_id: test_order.product_id,
        user_id: test_order.user_id,
        id: test_order.id,
      });
    });

    afterAll(async () => {
      const connection = await client.connect();
      await connection.query(
        `DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1;`
      );
      await connection.query(
        `DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
      );
      await connection.query(
        `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
      );
      connection.release();
    });
  });

  describe('Orders - Testing results of Model methods', () => {
    const test_order = {
      quantity: 10,
      status: 'shipped',
      product_id: 1,
      user_id: 1,
    } as Order;

    beforeAll(async () => {
      const connection = await client.connect();
      await connection.query(
        `INSERT INTO users (first_name,last_name,password) VALUES ('test','user','password123') RETURNING *;`
      );
      // user = { id:1 first_name:'test' last_name:'user' password:'password123' }
      await connection.query(
        `INSERT INTO products (name,price) VALUES ('product',10) RETURNING *;`
      );
      // product = { id:1 name:'product' price:10 }

      const sql = `INSERT INTO orders (quantity,status,product_id,user_id) VALUES (10,
       'shipped',${test_order.product_id},${test_order.user_id}) RETURNING *;`;
      const orderResponse = await connection.query(sql);
      test_order.id = orderResponse.rows[0].id;
    });

    it('Get user order method shoud get an order associated with a specific user_id', async () => {
      const response = await store.getUserOrder(test_order.id as number);
      expect(response).toEqual({
        quantity: test_order.quantity,
        status: test_order.status,
        product_id: test_order.product_id,
        user_id: test_order.user_id,
        id: test_order.id,
      });
    });

    it('Get user order method with an order that does not exist should return undefined', async () => {
      const response = await store.getUserOrder(999);
      expect(response).toBeUndefined();
    });

    afterAll(async () => {
      const connection = await client.connect();
      await connection.query(
        `DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1;`
      );
      await connection.query(
        `DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
      );
      await connection.query(
        `DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
      );
      connection.release();
    });
  });
});
