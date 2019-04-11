USE bamazon_DB;

CREATE TABLE products(
item_id INT PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price INT,
stock_quantity INT
)
