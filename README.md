# Node Blog

Simple Web Application that offer you to create, delete and edit blog using NodeJs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You have to install [Node.js](https://nodejs.org/en/) in your machine.

### Installing

After installing node clone the repo by using git

```
git clone https://github.com/5N3H4515H/node_blog.git
                        or
git clone git@github.com:5N3H4515H/node_blog.git
```

Or you can download the zip file.

Then open cmd or git bash on the project folder to install some modules that I used to build this project

Install Once

```
npm install
```

[Nodemon](https://www.npmjs.com/package/nodemon) For automatically restart the server as a dev dependency (optional)

```
npm i --sav-dev nodemon
```

### Setting Database

For the database I use [mongodb](https://www.mongodb.com/) [Atlas](https://www.mongodb.com/cloud/atlas). But you can use the local also.

Rename the file .env_sample to .env then replace "Your url" to your connection string

Example

```
MONGO_URL=mongodb+srv://dbUser:youruser@cluster0-kfx8y.mongodb.net/test?retryWrites=true&w=majority
```

## Running the App

If you install nodemon the you can use. (devStart script is already added to the package.json)

```
npm run devStart
```

or

```
node server.js
```

## Preview

<img src="preview/preview.gif" alt="preview image">

## Live Demo

For deploy the project I use [heroku](https://heroku.com)

[Node Blogger](https://snehasish-blogger.herokuapp.com/)

## Built With

- [Node Js](https://nodejs.org/en/) - The Backend
- [NPM](https://www.npmjs.com/) - Dependency Management
- [GIT](https://git-scm.com/) - Used for version control
- [Heroku](https://heroku.com) - Used to Deploy Node.js applications