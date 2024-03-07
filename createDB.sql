-- Таблица Животные (Animals)
create database course_project_database;
use course_project_database;

CREATE TABLE IF NOT EXISTS Animals (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       name VARCHAR(255) UNIQUE,
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


# Этот триггер будет вызываться перед вставкой новой записи в таблицу Animals. Он подсчитывает количество животных в заданной клетке (cageNum). Если количество животных превышает 2, триггер генерирует ошибку, и операция вставки отменяется. Таким образом, в клетке не будет больше двух животных.
DELIMITER $$

CREATE TRIGGER check_animal_count BEFORE INSERT ON Animals
    FOR EACH ROW
BEGIN
    DECLARE num_animals INT;

    -- Подсчитываем количество животных в заданной клетке
    SELECT COUNT(*)
    INTO num_animals
    FROM Animals
    WHERE cageNum = NEW.cageNum;

    -- Если количество животных в клетке превышает 2, генерируем ошибку
    IF num_animals >= 2 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'В клетке не может быть больше двух животных';
    END IF;
END$$

DELIMITER ;

# Этот триггер будет вызываться перед вставкой новой записи в таблицу Animals. Он проверяет количество животных с тем же типом питания в данной клетке (cageNum). Если найдены животные с другим типом питания, триггер генерирует ошибку, и операция вставки отменяется. Таким образом, в клетке всегда будут животные с одним типом питания.

DELIMITER $$

CREATE TRIGGER check_animal_type_of_feed BEFORE INSERT ON Animals
    FOR EACH ROW
BEGIN
    DECLARE num_animals_same_type INT;

    -- Проверяем количество животных с тем же типом питания в данной клетке
    SELECT COUNT(*)
    INTO num_animals_same_type
    FROM Animals
    WHERE cageNum = NEW.cageNum AND typeOfFeed <> NEW.typeOfFeed;

    -- Если есть животные с другим типом питания в клетке, генерируем ошибку
    IF num_animals_same_type > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'В клетке должны быть животные с одним типом питания';
    END IF;
END$$

DELIMITER ;

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