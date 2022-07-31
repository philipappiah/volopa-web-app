FROM node:14


LABEL version="1.0"
LABEL description="This is the base docker image for Volopa web app in nodejs with mongodb as database."

# app directory
WORKDIR /usr/src


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000/tcp
EXPOSE 4000/udp
CMD ["npm", "start"]