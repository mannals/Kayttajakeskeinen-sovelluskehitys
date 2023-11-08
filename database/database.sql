DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE PrivateMessages (
    message_id INT NOT NULL AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    read_status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user1_id) REFERENCES Users(user_id),
    FOREIGN KEY (user2_id) REFERENCES Users(user_id)
);

-- add users
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, DEFAULT);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, DEFAULT);
INSERT INTO Users (user_id, username, password, email, user_level_id) 
  VALUES (313, 'Aku-Ankka', 'secret313', 'aku@duckduckgo.com', 1);


-- add media items
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg'),
         ('f504.jpg', 48975, 'Desert', '', 313, 'image/jpeg');
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('60ac.jpg', 23829, 'Basement', 'Light setup in basement', 305, 'image/jpeg');


-- add comments 
INSERT INTO Comments (media_id, user_id, title, content)
  VALUES (1, 260, 'Näyttää hyvältä', 'Enpäs ookaan koskaan kuullu moisesta juomasta! Lähtee testiin ensi kerral ku tulee käytyä viihteellä :)'),
         (3, 305, 'Söpöliinit!!', 'Ootte oikeesti nii #friendshipgoals !!!'),
         (4, 313, 'Sellanen reissu oli', 'En osaa käyttää tätä mut juuh kävin Egyptissä :D näkymät oli ihan uskomattomia'),
         (5, 260, 'Ohhoh', 'Oot sä kyl niin näppärä käsistäs'),
         (5, 313, 'LOL', 'Millane nolife pitää olla et jää aikaa tollaseen :DDD');


-- add private messages
INSERT INTO PrivateMessages (user1_id, user2_id, content, read_status)
  VALUES (260, 305, 'Hei!! Miten menee?', 'seen'),
         (305, 260, 'Moooi mitäs täss :) tulin just töistä, kauhee väsy!', 'seen'),
         (260, 305, 'Voi sua :D piristäiskö jos pistäydyttäis tonne Jannen bileisiin?', 'seen'),
         (305, 260, 'Kyl ny sinne pitää jaksaa! Luulen et pitää vaa käydä hakee kaupasta joku energiajuoma ekana :p', 'seen'),
         (305, 313, 'Sori kun häiriköin sua taas tällee yhtäkkiä mut', 'received'),
         (305, 313, 'Mietin jatkuvasti niitä aikoja ku me oltiin vielä me... mun on edelleenki niin hankala uskoo et se on ohi, et sitä ei oo enää...', 'received'),
         (305, 313, 'Kai mä sitä vaan haluisin sanoo et jos haluut palata entiseen nii oon valmis siihen', 'received'),
         (305, 313, 'Sori viel ku häiritten.. Anyway, kaikkee hyvää sulle', 'received'),
         (260, 305, 'Jes! C ya there then!! :)', 'received'),
         (260, 305, 'Bileet alko jo, mis meet??', 'sent'),
         (260, 305, 'Halooooo', 'sent'),
         (313, 260, 'Hei oot mulle muuten kympin velkaa viel siitä pizzasta', 'seen'),
         (313, 260, 'Mä nään et oot lukenu nää', 'seen'),
         (313, 260, 'Maksa jo horo', 'received');


SELECT Users.username, COUNT(MediaItems.media_id) AS NumberOfMediaItems 
  FROM Users 
  JOIN MediaItems ON Users.user_id = MediaItems.user_id 
  GROUP BY Users.username;

UPDATE PrivateMessages SET content = 'Maksa jo pliis' WHERE message_id = 14;
UPDATE PrivateMessages SET read_status = 'seen' WHERE message_id = 14;

DELETE FROM Comments WHERE comment_id = 5;
DELETE FROM PrivateMessages WHERE user1_id = 305 AND user2_id = 313;