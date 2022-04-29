import client from '../database/database';
import Product from '../types/productType';

class productStore {
  // Index
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products;';
      const response = await connection.query(sql);
      connection.release();
      return response.rows;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  // Show product
  async showProduct(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1);';
      const response = await connection.query(sql, [id]);
      connection.release();
      return response.rows[0];
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  // Create Product
  async createProduct(name: string, price: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING id, name,price;';
      const response = await connection.query(sql, [name, price]);
      connection.release();
      return response.rows[0];
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}

export default productStore;
