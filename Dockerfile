FROM node:alpine
COPY webapp /usr/webapp
WORKDIR /usr/webapp
RUN npm config set strict-ssl false
RUN npm install -g concurrently nodemon
RUN npm install \
    && npm --prefix /usr/webapp/client install /usr/webapp/client
CMD ["npm", "run", "dev"]