CREATE TABLE USERS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255),
  phone VARCHAR(50),
  solar TINYINT(1) DEFAULT 0,
  wind TINYINT(1) DEFAULT 0,
  battery TINYINT(1) DEFAULT 0,
  other TINYINT(1) DEFAULT 0,
  message TEXT
);
CREATE TABLE Quotes (
  quote_id INT AUTO_INCREMENT PRIMARY KEY,
  quote_name VARCHAR(255) NOT NULL
);

INSERT INTO Quotes (quote_name)
VALUES ('Energy Generation & Storage'),
       ('Energy Efficiency'),
       ('Smart Home Technology');


CREATE TABLE Projects (
  Project_Id INT AUTO_INCREMENT PRIMARY KEY,
  quote_id VARCHAR(40),
  Project_name VARCHAR(255) NOT NULL,
  Project_Description TEXT,
  Estimated_cost DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (quote_id) REFERENCES Quotes(quote_id)
);

INSERT INTO Projects (quote_id, Project_name, Project_Description, Estimated_cost)
VALUES 
  ('1', 'Battery Storage Installation', 'Installing a battery storage system to store excess solar energy for later use.', 200000.00),
  ('1', 'Home Battery Backup Systems', 'Backup power solution with a battery system for your home in case of power outages.', 150000.00),
  ('1', 'Wind Turbine Installation', 'Installation of a wind turbine to generate renewable energy for your home.', 500000.00),
  ('2', 'Energy Audits', 'Analyze your homes energy consumption to identify areas for improvement and reduce energy costs.', 20000.00),
  ('2', 'Smart Home Automation Installation', 'Automate lighting, appliances, and thermostats for convenience and energy savings.', 100000.00),
  ('3', 'Electric Vehicle Charging Systems', 'Install a charging station at your home for your electric vehicle.', 800000.00);
CREATE TABLE Bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  Project_Id INT,
  payment_method VARCHAR(20),
  booking_status ENUM('pending', 'checkedIn', 'completed', 'cancelled') DEFAULT 'checkedIn',
  FOREIGN KEY (user_email) REFERENCES Users(email),
  FOREIGN KEY (Project_Id) REFERENCES Projects(Project_Id)
  -- I have added two other columns , one for the estimatedCost and another one for the name 
);

