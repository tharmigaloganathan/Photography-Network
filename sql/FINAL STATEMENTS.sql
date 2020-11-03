SELECT *
FROM customers
INNER JOIN events ON events.customerID = customers.customerID
INNER JOIN pictures ON pictures.eventID = events.eventID
INNER JOIN occasions ON events.occasionID = occasions.occasionID
WHERE pictures.photographerID = "PH268";


SELECT * FROM pictures
INNER JOIN events ON events.eventID = pictures.eventID
INNER JOIN occasions ON events.occasionID = occasions.occasionID
INNER JOIN photographers ON pictures.photographerID = photographers.photographerID;

SELECT *
FROM cameras;

SELECT *
FROM lenses;

UPDATE pictures
SET numberOfLikes = (SELECT numberOfLikes
	WHERE pictureID ="PI959") + 1
WHERE pictureID ="PI959"

SELECT * FROM pictures
INNER JOIN events ON events.eventID = pictures.eventID
INNER JOIN occasions ON events.occasionID = occasions.occasionID
INNER JOIN lenses ON lenses.lensID = pictures.lensID
INNER JOIN cameras on cameras.cameraID = pictures.cameraID
WHERE pictures.photographerID = 'PH268'

INSERT INTO pictures
VALUES('PI6011','LE23','CA1','EV3','PH268',1000,200,200,200,'imageURL')

SELECT eventID
FROM pictures
WHERE photographerID = "PH268";

INSERT INTO pictures
VALUES('PI6000','LE0','CA0','EV0','PH268',1000,200,200,200,'http://willchaophotography.com/wp-content/uploads/2015/07/melbourne_wedding_photographer_lexi-85.jpg');


SELECT COUNT(pictures.eventID), occasions.occasionName, cameras.cameraModel, cameras.cameraBrand
FROM pictures
INNER JOIN cameras on pictures.cameraID = cameras.cameraID
INNER JOIN events on events.eventID = pictures.eventID
INNER JOIN occasions on occasions.occasionID = events.occasionID
WHERE pictures.cameraID = "CA10"
GROUP BY occasions.occasionID;

SELECT SUM(pictures.numberOfLikes), occasions.occasionName, cameras.cameraModel, cameras.cameraBrand
FROM pictures
INNER JOIN cameras on pictures.cameraID = cameras.cameraID
INNER JOIN events on events.eventID = pictures.eventID
INNER JOIN occasions on occasions.occasionID = events.occasionID
WHERE pictures.cameraID = "CA10"
GROUP BY occasions.occasionID;

SELECT *
FROM pictures
WHERE photographerID = "PH268";
