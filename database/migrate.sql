DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
    PRIMARY KEY(id)
); 


DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
    id INT GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
    PRIMARY KEY(id)
); 

DROP TABLE IF EXISTS store;
CREATE TABLE store(
    id INT GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
    url VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY(id)
); 

DROP TABLE IF EXISTS product_info;
CREATE TABLE product_info(
    id INT GENERATED ALWAYS AS IDENTITY,
	name varchar NOT NULL,
    url VARCHAR NOT NULL,
	store_id INT NOT NULL REFERENCES store (id) ON DELETE CASCADE,
    img_url VARCHAR,
    PRIMARY KEY(id)
); 


DROP TABLE IF EXISTS product_data;
CREATE TABLE IF NOT EXISTS product_data
(
    sales integer NOT NULL,
    last_update timestamp without time zone DEFAULT now(),
    price numeric NOT NULL,
    invoice numeric NOT NULL,
    day date DEFAULT now(),
    product_id INT NOT NULL REFERENCES product_info (id) ON DELETE CASCADE,
    PRIMARY KEY(product_id,day)
)
-- mock
-- insert into product_info (name,price,url,store_id) 
-- VALUES
-- ('Pulseira Moon Strong','R$ 49,90', '/collections/all/products/pulseira-de-pedra',1),
-- ('Pinc\u00e9is TopCar','R$ 49,90', '/collections/all/products/topcar',1),
-- ('Flash Carpet - Tapete Super Absorvente','R$ 179,90', '/collections/all/products/carpet',1),
-- ('Panos Cleanex - Kits com 3 ou 5 Unidades!','R$ 59,90', '/collections/all/products/cleanex',1),
-- ('Colar Masculino Old Titams - Modelo: Triquetra','R$ 79,90', '/collections/all/products/colar-triquetra',1),
-- ('Colar Masculino Old Titams - Modelo 9','R$ 79,90', '/collections/all/products/tipo-9',1),
-- ('Colar Masculino Old Titams - Modelo 8','R$ 79,90', '/collections/all/products/tipo-8',1),
-- ('Colar Masculino Old Titams - Modelo 7','R$ 79,90', '/collections/all/products/tipo-7',1),
-- ('Colar Masculino Old Titams - Modelo 6','R$ 79,90', '/collections/all/products/tipo-6',1),
-- ('Colar Masculino Old Titams - Modelo 5','R$ 79,90', '/collections/all/products/tipo-5',1),
-- ('Colar Masculino Old Titams - Modelo 4','R$ 79,90', '/collections/all/products/tipo-4',1),
-- ('Colar Masculino Old Titams - Modelo 3','R$ 79,90', '/collections/all/products/tipo-3',1),
-- ('Colar Masculino Old Titams - Modelo 2','R$ 79,90', '/collections/all/products/tipo-2',1),
-- ('Colar Masculino Old Titams - Modelo 1','R$ 79,90', '/collections/all/products/tipo-1',1),
-- ('Colar Masculino SKR - Pingente: Minimalista','R$ 67,90', '/collections/all/products/pingente-5',1),
-- ('Colar Masculino SKR - Pingente: Yin Yang','R$ 67,90', '/collections/all/products/pingente-4',1),
-- ('Colar Masculino SKR - Pingente: Paz e Amor','R$ 67,90', '/collections/all/products/pingente-3',1),
-- ('Colar Masculino SKR - Pingente: Solar','R$ 67,90', '/collections/all/products/pingente-2',1),
-- ('Colar Masculino SKR - Pingente: Rosa dos Ventos','R$ 67,90', '/collections/all/products/pingente-0',1),
-- ('Colar Masculino SKR - Pingente: Ferradura','R$ 67,90', '/collections/all/products/pingente-1',1),
-- ('Correntes de A\u00e7o TNTx - Cor: Preto','De ', '/collections/all/products/corrente-aco-3',1),
-- ('Correntes de A\u00e7o TNTx - Cor: Ouro','De ', '/collections/all/products/corrente-aco-1',1),
-- ('Correntes de A\u00e7o TNTx - Cor: Prata','De ', '/collections/all/products/corrente-aco-2',1),
-- ('Pulseira de Couro Man Style - Modelo: Folha Prata','R$ 79,90', '/collections/all/products/classica-9',1)


-- insert into product_data (sales,price,product_id) values 
-- (24,'70',1),
-- (3,'70',2),
-- (2534,'70',3),
-- (5,'70',4)

-- insert into product_data (sales,price,product_id, day) values 
-- (24,'70',1, current_date - INTEGER '1'),
-- (19,'70',2,current_date - INTEGER '1'),
-- (847,'70',3,current_date - INTEGER '1'),
-- (555,'70',4,current_date - INTEGER '1')

