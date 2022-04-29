import client from '../database/database';
import Order from '../types/orderType';

class OrdersStore {
  async getUserOrder(user_id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT user_id, product_id, orders.id , quantity, status FROM orders JOIN users ON users.id = orders.user_id WHERE users.id=($1);';

      const response = await connection.query(sql, [user_id]);
      connection.release();
      return response.rows[0];
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
export default OrdersStore;
