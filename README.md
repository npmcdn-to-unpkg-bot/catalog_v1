# catalog_v1

Quick and dirty catalog app designed to test basic assumptions ...well there ain't nothing more permanent then "quick and dirty" :)

This is the basic catalog app that the users are going to login to purchase artworks form Infinite Industries. 
Putting this together to figure out specific UX/and general business logic issues ahead. 

#To Run:

1. clone this repo
2. npm install
3. create .env file
4. add the following to you .env -->

```
MODE= DEVELOPMENT
ADMIN_EMAIL= your@email.com
LIVE_MAILGUN_API_KEY= YourMailgunAPIkey
LIVE_MAILGUN_DOMAIN = your.mailgun.domain
LINK_TO_MONGO= mongodb://<your_name>:<your_password>@ds042379.mlab.com:42379/your_db_name
```
5. npm start 

