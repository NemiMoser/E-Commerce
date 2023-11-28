-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;


CREATE TABLE IF NOT EXISTS `Product` (
  `product_id` INTEGER auto_increment,
  `product_name` VARCHAR(255) NOT NULL,
  `product_price` DECIMAL(10,2) NOT NULL,
  `product_stock` INTEGER NOT NULL DEFAULT 10,
  `category_id` INTEGER,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
