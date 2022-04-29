CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  status VARCHAR(20),
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id)
);