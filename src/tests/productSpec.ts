import productStore from '../models/product';
import Product from '../types/productType';
import client from '../database/database';
import app from '../index';
import supertest from 'supertest';

const store = new productStore();
const request = supertest(app);

describe('Products - Testing for the Existance of Methods', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(store.showProduct).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(store.createProduct).toBeDefined();
  });
});

describe('Products Endpoints Testing', () => {
  const test_product = {
    name: 'milk',
    price: 20,
  } as Product;

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InBhc3Nhc2QxMjMiLCJpYXQiOjE2NTEyNDg5ODF9.3c7FoZ8qnPQwpLlfsVTLMsMAZHEwgc4eC-T7uTK_leg';

  beforeAll(async () => {
    const productResponse = await store.createProduct(
      test_product.name,
      test_product.price
    );
    test_product.id = productResponse.id;
  });

  it('api/products Endpoint - Create product', async () => {
    const response = await request
      .post('/api/products')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'juice',
        price: 50,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      id: 2,
      name: 'juice',
      price: 50,
    });
  });

  it('api/users/:id Endpoint - Show product', async () => {
    const response = await request
      .get('/api/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      id: test_product.id,
      name: test_product.name,
      price: test_product.price,
    });
  });

  it('api/products Endpoint - Index', async () => {
    const response = await request
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      {
        id: test_product.id,
        name: test_product.name,
        price: test_product.price,
      },
      {
        id: 2,
        name: 'juice',
        price: 50,
      },
    ]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      `DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
    );
    connection.release();
  });
});

describe('Products - Testing results of Model methods', () => {
  const test_product = {
    name: 'milk',
    price: 20,
  } as Product;

  beforeAll(async () => {
    const productResponse = await store.createProduct(
      test_product.name,
      test_product.price
    );
    test_product.id = productResponse.id;
  });

  it('Create method should add a product', async () => {
    const response = await store.createProduct('juice', 55);
    expect(response).toEqual({
      name: 'juice',
      price: 55,
      id: 2,
    });
  });

  it('Show product method shoud get a product with a specific id', async () => {
    const response = await store.showProduct(test_product.id as number);
    expect(response).toEqual({
      name: test_product.name,
      price: test_product.price,
      id: test_product.id,
    });
  });

  it('Index method shoud get all products', async () => {
    const response = await store.index();
    expect(response).toEqual([
      {
        name: test_product.name,
        price: test_product.price,
        id: test_product.id,
      },
      {
        name: 'juice',
        price: 55,
        id: 2,
      },
    ]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    await connection.query(
      `DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
    );
    connection.release();
  });
});
