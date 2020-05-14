# Aircnc - Frontend

This is the frontend of the **Aircnc** project developed by [**_Rocketseat_**](https://rocketseat.com.br/), a Brazilian company that teaches Node.JS, ReactJS and React Native.
This is a project where I could learn many professional techniques that is used in "the real world".

## About the project

- The **Aircnc** is an application where a company can share a spot inside of your building to other developers to use it daily.
- The **_company_** access the website to register a spot saying the company's name, which technology they use and the price.
- The **_user_** access the app to search for a spot. He/She enter with an email and which technologies they work with and then they are send to another page where they can find some spots and request a date.
- The **_company_** receives this request in real-time and can accept or decline it sending the answer also in real-time to the **_user_**.

## The frontend

The frontend was developed with [**_ReactJS_**](https://reactjs.org/) using [**Axios**](https://www.npmjs.com/package/axios) for the http requests.
[**react-router-dom**](https://www.npmjs.com/package/react-router-dom) was used to handle the routes in this application and [**socket.io**](https://socket.io/) to connect the requests from the mobile to the web in real-time.

**Login**
![login](img/part1.png)

**Dashboard**
![dashboard](img/part2.png)

**Register new spot**
![newspot](img/part3.png)

**New spot**
![new](img/part4.png)

**New Dashboard**
![newdashboard](img/part5.png)

## Getting started

1.  Prerequisites

- npm

      npm install npm@latest -g

2. Installation

- Clone the repo

      git clone https://github.com/euguilhermegirardi/Aircnc-Frontend.git

3. Install NPM packages

   npm install

4. Run the application

   npm run start

## Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a pull request

## License

![MIT](https://img.shields.io/badge/License-MIT-blue.svg)
