import client from '../database/database';
import bcrypt from 'bcrypt';

const { SALT_ROUNDS, PEPPER } = process.env;

type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

class UserStore {
  // Index
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users;';
      const response = await connection.query(sql);
      connection.release();
      return response.rows;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  // Show User
  async showUser(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1);';
      const response = await connection.query(sql, [id]);
      connection.release();
      return response.rows[0];
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  // Create User
  async createUser(
    first_name: string,
    last_name: string,
    password: string
  ): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) RETURNING first_name,last_name,password ;';
      const hash = bcrypt.hashSync(
        `${password}${PEPPER}`,
        parseInt(SALT_ROUNDS as string)
      );
      const response = await connection.query(sql, [
        first_name,
        last_name,
        hash,
      ]);
      connection.release();
      return response.rows[0];
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}

export default UserStore;
