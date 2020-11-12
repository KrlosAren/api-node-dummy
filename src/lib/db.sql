CREATE TABLE users (
  id int(6) UNIQUE AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(30) NOT NULL,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, firstname, lastname, email) values ('krlosaren', '1234', 'Carlos', 'Lopez', 'test@user.com');

CREATE TABLE links (
  id INT(6) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  url_description TEXT,
  user_id int(11),
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER table links ADD PRIMARY key(id);
ALTER table links CHANGE id id int(10) AUTO_INCREMENT UNIQUE;

INSERT INTO links (title, url, url_description, user_id) values ('facebook', 'https://facebook.com', 'link to facebook', 1);

