-- Таблица Животные (Animals)
create database course_project_database;
use course_project_database;

CREATE TABLE IF NOT EXISTS Animals (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       name VARCHAR(255),
    species VARCHAR(255),
    gender VARCHAR(10),
    height DECIMAL(10, 2),
    weight DECIMAL(10, 2),
    date DATE,
    age INT,
    typeOfFeed VARCHAR(255),
    naturalArea VARCHAR(255),
    cageNum INT,
    offspring BOOLEAN,
    numOffspring INT,
    idMale INT,
    idFemale INT
    );

-- Таблица Работники (Employees)
CREATE TABLE IF NOT EXISTS Employees (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(255),
    surname VARCHAR(255),
    gender VARCHAR(10),
    idPosition INT,
    date DATE,
    age INT,
    FOREIGN KEY (idPosition) REFERENCES Positions(id)
    );

-- Таблица Корма (Feed)
CREATE TABLE IF NOT EXISTS Feed (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    name VARCHAR(255),
    nameSupplier VARCHAR(255),
    typeOfFeed VARCHAR(255),
    size VARCHAR(50),
    price DECIMAL(10, 2),
    date DATE
    );

-- Таблица Болезни (Illnesses)
CREATE TABLE IF NOT EXISTS Illnesses (
    name VARCHAR(255),
    idAnimal INT,
    date DATE,
    PRIMARY KEY (name, idAnimal),
    FOREIGN KEY (idAnimal) REFERENCES Animals(id)
    );

-- Таблица Должности (Positions)
CREATE TABLE IF NOT EXISTS Positions (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(255),
    salary DECIMAL(10, 2),
    access BOOLEAN
    );

-- Таблица Вакцинации (Vaccination)
CREATE TABLE IF NOT EXISTS Vaccination (
    name VARCHAR(255),
    idAnimal INT,
    date DATE,
    PRIMARY KEY (name, idAnimal),
    FOREIGN KEY (idAnimal) REFERENCES Animals(id)
    );

-- Таблица Работа с животными (WorkWithAnimals)
CREATE TABLE IF NOT EXISTS WorkWithAnimals (
                                               idPosition INT,
                                               idAnimal INT,
                                               dateFrom DATE,
                                               dateTo DATE,
                                               PRIMARY KEY (idPosition, idAnimal, dateFrom),
    FOREIGN KEY (idPosition) REFERENCES Positions(id),
    FOREIGN KEY (idAnimal) REFERENCES Animals(id)
    );

-- Таблица Зоопарки (Zoos)
CREATE TABLE IF NOT EXISTS Zoos (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    idAnimal INT,
                                    name VARCHAR(255),
    date DATE,
    FOREIGN KEY (idAnimal) REFERENCES Animals(id)
    );