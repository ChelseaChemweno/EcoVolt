CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)  
  user_type ENUM('client','admin','expert')-- Remember to hash and secure passwords before storing
);
CREATE TABLE Client_Details (
  user_id INT PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  company_name VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(255)
);
CREATE TABLE Admin_Details (
  user_id INT PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  -- Add specific admin details if needed (e.g., department)
);
CREATE TABLE Expert_Details (
  user_id INT PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  expertise_area ENUM('solar', 'wind', 'storage', 'other'),
  years_of_experience INT,
  bio TEXT
);

CREATE TABLE Projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  client_id INT,
  project_name VARCHAR(255),
  project_type ENUM('residential', 'commercial', 'industrial', 'government'),
  project_scope TEXT,
  location TEXT,
  status ENUM('pending', 'in-progress', 'completed'),
  start_date DATE,
  completion_date DATE,
  FOREIGN KEY (user_id) REFERENCES Users(Users_id)
);
CREATE TABLE Services (
  service_id INT PRIMARY KEY AUTO_INCREMENT,
  service_name VARCHAR(255),
  service_description TEXT
);
CREATE TABLE Project_Services (
  project_id INT,
  service_id INT,
  PRIMARY KEY (project_id, service_id),
  FOREIGN KEY (project_id) REFERENCES Projects(project_id),
  FOREIGN KEY (service_id) REFERENCES Services(service_id)
);
CREATE TABLE Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  product_description TEXT,
  product_image VARCHAR(255)
);
CREATE TABLE User_Favorites (
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  PRIMARY KEY (user_id, product_id)  -- Ensures a user can only favorite a product once
);
CREATE TABLE Content (
  news_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  publish_date DATE,
  content TEXT,
  -- author_id INT DEFAULT NULL,
  -- FOREIGN KEY (author_id) REFERENCES Users(user_id)  -- Optional for author information
);
CREATE TABLE Contact_Us_Submissions (
  contact_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT
);


