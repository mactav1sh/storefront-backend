# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: `'api/products' [GET]`
- Show route: `'api/products/:id' [GET]`
- Create route: `'api/products' [POST] [token required]`

#### Users

- Index route: `'api/users' [GET] [token required]`
- Show route: `'api/users/:id' [GET] [token required]`
- Create route: `'api/users' [POST] [token required]`

#### Orders

- Current Order by user route: `'api/users/:id/orders' [GET] (args: user id) [token required]`

## Data Shapes

#### Product

- id
- name
- price
- Table: `products (id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER)`

#### User

- id
- firstName
- lastName
- password
- Table: `users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, password VARCHAR)`

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- Table: `orders (id SERIAL PRIMARY KEY, quantity INTEGER, status VARCHAR, product_id INTEGER REFERENCES products(id), user_id INTEGER REFERENCES users(id))`
