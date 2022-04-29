import productStore from '../models/product';
import Product from '../types/productType';
import client from '../database/database';
// import app from '../index';
// import supertest from 'supertest';

const store = new productStore();

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

// const request = supertest(app);
// describe('Users Endpoints Testing', () => {
//   it('api/users Endpoint', async () => {
//     const response = await request.get('/api/users');
//     expect(response.status).toBe(200);
//   });
// });

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

  it('create method should add a product', async () => {
    const response = await store.createProduct('juice', 55);
    expect(response).toEqual({
      name: 'juice',
      price: 55,
      id: 2,
    });
  });

  it('show product method shoud get a product with a specific id', async () => {
    const response = await store.showProduct(test_product.id as number);
    expect(response).toEqual({
      name: test_product.name,
      price: test_product.price,
      id: test_product.id,
    });
  });

  it('index method shoud get all products', async () => {
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
