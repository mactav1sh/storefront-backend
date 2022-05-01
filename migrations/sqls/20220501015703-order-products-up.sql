CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  product_id INTEGER REFERENCES products(id),
  order_id INTEGER REFERENCES orders(id)
)
