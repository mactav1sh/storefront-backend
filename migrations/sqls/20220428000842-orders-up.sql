CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL,
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id)
);