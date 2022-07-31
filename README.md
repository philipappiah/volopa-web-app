

---

# Volopa web wallet
A client-server web wallet with currency convertor. 

The backend uses [Express 4](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/) using [Mongoose ODM](https://mongoosejs.com/) as database.

The client uses [React](https://reactjs.org/)

## Running Backend Locally 

Make sure you have [Node.js](http://nodejs.org/) installed.

navigate to the /backend directory and run the commands below

```bash
npm install
npm start
```

Your app should now be running on [localhost:4000](http://localhost:4000/).

You can view the api docs via the endpoint http://localhost:4000/api-docs

## Testing
```bash
npm run test
```


## Running Client Locally 

Make sure you have [Node.js](http://nodejs.org/) and [React](https://reactjs.org/)  installed.

navigate to the /client directory and run the commands below

```bash
npm install
npm start
```

Your react client app should now be running on [localhost:3000](http://localhost:3000/).





## Running with Docker
You can run both the backend and the client at once using the docker and docker-compose.

Make sure you have [Docker](https://www.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/) installed.
Docker version 20.10.10 or higher

```bash
docker-compose build
docker-compose up
```

Your node backend should now be running on [localhost:4000](http://localhost:4000/).

Your react client app should now be running on [localhost:3000](http://localhost:3000/).


