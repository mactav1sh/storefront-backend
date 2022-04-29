import client from '../database/database';
import OrdersStore from '../models/order';
import Order from '../types/orderType';

const store = new OrdersStore();

describe('Orders - Testing for the Existance of Methods', () => {
  it('Should have a get user order method', () => {
    expect(store.getUserOrder).toBeDefined();
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

  it('get user order method shoud get an order associated with a specific user_id', async () => {
    const response = await store.getUserOrder(test_order.id as number);
    expect(response).toEqual({
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
