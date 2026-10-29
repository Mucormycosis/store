CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  cat_slug TEXT,
  category TEXT,
  img TEXT,
  stock INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR REPLACE INTO products (id, title, price, old_price, cat_slug, category, img, stock) VALUES
(1,'Процессор AMD Ryzen 5 5600X',4299,4999,'cpu','Процессоры','https://via.placeholder.com/200x160?text=CPU',12),
(2,'Процессор Intel Core i5-12400F',4599,5199,'cpu','Процессоры','https://via.placeholder.com/200x160?text=CPU',10),
(3,'Видеокарта NVIDIA RTX 4060',9499,10999,'gpu','Видеокарты','https://via.placeholder.com/200x160?text=GPU',5),
(4,'Видеокарта AMD RX 7600',8999,9999,'gpu','Видеокарты','https://via.placeholder.com/200x160?text=GPU',7),
(5,'Материнская плата ASUS B550',3299,3799,'mb','Материнские платы','https://via.placeholder.com/200x160?text=MB',8),
(6,'Материнская плата MSI B660',3599,3999,'mb','Материнские платы','https://via.placeholder.com/200x160?text=MB',9),
(7,'Оперативная память 16GB DDR4',1199,1499,'ram','Память','https://via.placeholder.com/200x160?text=RAM',20),
(8,'Оперативная память 32GB DDR5',2799,3299,'ram','Память','https://via.placeholder.com/200x160?text=RAM',15),
(9,'SSD 1TB NVMe',1899,2299,'storage','Накопители','https://via.placeholder.com/200x160?text=SSD',15),
(10,'SSD 2TB NVMe',3499,3999,'storage','Накопители','https://via.placeholder.com/200x160?text=SSD',12),
(11,'HDD 2TB',1299,1599,'storage','Накопители','https://via.placeholder.com/200x160?text=HDD',18),
(12,'Блок питания 650W',1699,1999,'storage','Блоки питания','https://via.placeholder.com/200x160?text=PSU',10),
(13,'Блок питания 750W',2199,2599,'storage','Блоки питания','https://via.placeholder.com/200x160?text=PSU',8),
(14,'Корпус ATX',1499,1799,'storage','Корпуса','https://via.placeholder.com/200x160?text=Case',14),
(15,'Кулер для процессора',699,899,'cpu','Охлаждение','https://via.placeholder.com/200x160?text=Cooler',25),
(16,'Термопаста',199,299,'cpu','Охлаждение','https://via.placeholder.com/200x160?text=Paste',40),
(17,'Вентилятор 120mm',249,349,'storage','Охлаждение','https://via.placeholder.com/200x160?text=Fan',30),
(18,'Wi-Fi адаптер',399,499,'mb','Сетевое','https://via.placeholder.com/200x160?text=WIFI',16),
(19,'Кабель SATA',49,79,'storage','Кабели','https://via.placeholder.com/200x160?text=Cable',50),
(20,'Коврик для мыши XL',299,399,'storage','Аксессуары','https://via.placeholder.com/200x160?text=Pad',22);
