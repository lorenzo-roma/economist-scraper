# Economist Scraper

## Basic React and Web Scraping API project

## Project

I wanted to try our React and challenge myself to develop a web scraping API.
Both the applications are written in Typescript.

### FRONTEND

Front-end is made with React, without libraries to help in state management.

### BACKEND

Backend implemented using Express.js library.

### PURPOSE AND FUNCTIONALITIES

The application fetches articles from the Economist website.
If you register within the application ( there is not DB, the data is stored inside RAM memory ), you can see the article details.
The backend app logs all the phases necessary to scrape the Economist website in order to obtain the requested data.
The style of the React application is inspired by the style present in the Economist website at the time of writing.

# How to install and run:

### API

Clone the repo.
Then:
```sh
cd back-end
npm i
npm run build
npm start
```

### WebApp React

Clone the repo.
Then:

```sh
cd front-end
npm i
npm start
```

## Deploy

The applications are deployed on Heroku, you can check them at:

https://economist-scraper-front-end.herokuapp.com/

